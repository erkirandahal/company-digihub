<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Blog;
use App\Models\BlogImage;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\AuditLog;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::with(['author', 'category', 'tags']);

        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $blogs = $query->where('status', 'published')
            ->latest('published_at')
            ->paginate(9);

        return $this->successResponse($blogs->items(), 'Blog posts retrieved', 200, [
            'current_page' => $blogs->currentPage(),
            'last_page' => $blogs->lastPage(),
            'total' => $blogs->total(),
        ]);
    }

    public function show(string $slug)
    {
        $blog = Blog::with(['author', 'category', 'tags', 'relatedProject', 'gallery'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment view count
        $blog->increment('view_count');

        $related = Blog::with(['category', 'tags'])
            ->where('id', '!=', $blog->id)
            ->where('category_id', $blog->category_id)
            ->take(3)
            ->get();

        return $this->successResponse([
            'post' => $blog,
            'related' => $related,
        ]);
    }

    public function categories()
    {
        return $this->successResponse(BlogCategory::orderBy('name')->get());
    }

    public function tags()
    {
        return $this->successResponse(BlogTag::orderBy('name')->get());
    }

    public function byCategory(string $slug)
    {
        $category = BlogCategory::where('slug', $slug)->firstOrFail();

        $blogs = Blog::with(['author', 'category', 'tags'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(9);

        return $this->successResponse($blogs->items(), 'Blog posts retrieved', 200, [
            'current_page' => $blogs->currentPage(),
            'last_page' => $blogs->lastPage(),
            'total' => $blogs->total(),
        ]);
    }

    public function byTag(string $slug)
    {
        $tag = BlogTag::where('slug', $slug)->firstOrFail();

        $blogs = $tag->blogs()
            ->with(['author', 'category', 'tags'])
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(9);

        return $this->successResponse($blogs->items(), 'Blog posts retrieved', 200, [
            'current_page' => $blogs->currentPage(),
            'last_page' => $blogs->lastPage(),
            'total' => $blogs->total(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:1000',
            'content' => 'required|string',
            'category_id' => 'required|exists:blog_categories,id',
            'content_type' => 'required|string',
            'reading_time' => 'nullable|integer',
            'status' => 'required|in:draft,scheduled,published,archived',
            'featured' => 'boolean',
            'tags' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'featured_image_index' => 'nullable|integer',
        ]);

        $payload = collect($validated)
            ->except(['tags', 'images', 'featured_image_index'])
            ->all();
        $payload['slug'] = Str::slug($payload['title']);
        $payload['author_id'] = $request->user()->id;
        if ($payload['status'] === 'published') {
            $payload['published_at'] = now();
        }

        $blog = Blog::create($payload);

        if ($request->has('tags')) {
            $blog->tags()->sync($this->resolveTagIds($request->input('tags', [])));
        }

        $this->syncGallery($request, $blog, true);

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'Published blog post',
            'module' => 'blog',
            'record_id' => $blog->id,
        ]);

        return $this->successResponse($blog->load(['category', 'tags', 'gallery']), 'Blog post created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'sometimes|required|string|max:1000',
            'content' => 'sometimes|required|string',
            'category_id' => 'sometimes|required|exists:blog_categories,id',
            'content_type' => 'sometimes|required|string',
            'reading_time' => 'nullable|integer',
            'status' => 'sometimes|required|in:draft,scheduled,published,archived',
            'featured' => 'boolean',
            'tags' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'featured_image_index' => 'nullable|integer',
            'featured_image_id' => 'nullable|integer',
            'remove_image_ids' => 'nullable|array',
        ]);

        $payload = collect($validated)
            ->except(['tags', 'images', 'featured_image_index', 'featured_image_id', 'remove_image_ids'])
            ->all();

        if (isset($payload['title']) && $payload['title'] !== $blog->title) {
            $payload['slug'] = Str::slug($payload['title']);
        }

        if (($payload['status'] ?? null) === 'published' && $blog->published_at === null) {
            $payload['published_at'] = now();
        }

        $blog->update($payload);

        if ($request->has('tags')) {
            $blog->tags()->sync($this->resolveTagIds($request->input('tags', [])));
        }

        $this->syncGallery($request, $blog, false);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated blog post',
            'module' => 'blog',
            'record_id' => $blog->id,
        ]);

        return $this->successResponse($blog->load(['category', 'tags', 'gallery']), 'Blog post updated successfully');
    }

    /**
     * Accept either existing BlogTag ids or free-text tag names — new names are
     * created on the fly, matching how a tag-input field is normally expected to behave.
     */
    private function resolveTagIds(array $tags): array
    {
        return collect($tags)
            ->map(function ($tag) {
                if (is_numeric($tag)) {
                    return (int) $tag;
                }
                $tag = trim((string) $tag);
                if ($tag === '') {
                    return null;
                }
                return BlogTag::firstOrCreate(
                    ['slug' => Str::slug($tag)],
                    ['name' => $tag]
                )->id;
            })
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    public function destroy(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted blog post',
            'module' => 'blog',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Blog post deleted successfully');
    }

    private function syncGallery(Request $request, Blog $blog, bool $isCreate): void
    {
        if ($request->filled('remove_image_ids')) {
            $toRemove = $blog->gallery()->whereIn('id', $request->input('remove_image_ids'))->get();
            foreach ($toRemove as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        $newPaths = [];
        if ($request->hasFile('images')) {
            $nextOrder = (int) $blog->gallery()->max('sort_order');
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('blog', 'public');
                $blog->gallery()->create([
                    'image_path' => $path,
                    'sort_order' => $nextOrder + $index + 1,
                ]);
                $newPaths[$index] = $path;
            }
        }

        if ($request->filled('featured_image_id')) {
            $image = BlogImage::find($request->input('featured_image_id'));
            if ($image && $image->blog_id === $blog->id) {
                $blog->featured_image = $image->image_path;
            }
        } elseif ($request->filled('featured_image_index') && array_key_exists((int) $request->input('featured_image_index'), $newPaths)) {
            $blog->featured_image = $newPaths[(int) $request->input('featured_image_index')];
        } elseif ($isCreate && ! empty($newPaths)) {
            $blog->featured_image = $newPaths[0];
        }

        if ($blog->isDirty('featured_image')) {
            $blog->save();
        }
    }
}
