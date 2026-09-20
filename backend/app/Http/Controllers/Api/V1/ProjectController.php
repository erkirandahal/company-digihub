<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\AuditLog;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['industry', 'technologies', 'gallery']);

        if ($request->has('industry') && $request->industry !== 'all') {
            $query->whereHas('industry', function ($q) use ($request) {
                $q->where('slug', $request->industry);
            });
        }

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        $projects = $query->where('status', 'published')
            ->latest()
            ->paginate(9);

        return $this->successResponse($projects->items(), 'Request successful', 200, [
            'current_page' => $projects->currentPage(),
            'last_page' => $projects->lastPage(),
            'total' => $projects->total(),
        ]);
    }

    public function show(string $slug)
    {
        $project = Project::with(['industry', 'technologies', 'gallery'])
            ->where('slug', $slug)
            ->firstOrFail();

        return $this->successResponse($project);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:500',
            'full_description' => 'required|string',
            'client' => 'nullable|string',
            'industry_id' => 'nullable|exists:industries,id',
            'project_type' => 'required|string',
            'challenges' => 'nullable|string',
            'solutions' => 'nullable|string',
            'results' => 'nullable|string',
            'project_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'featured' => 'boolean',
            'status' => 'required|in:published,draft,archived',
            'technologies' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'featured_image_index' => 'nullable|integer',
        ]);

        $payload = collect($validated)
            ->except(['technologies', 'images', 'featured_image_index'])
            ->all();
        $payload['slug'] = Str::slug($validated['title']);
        $project = Project::create($payload);

        if ($request->has('technologies')) {
            $project->technologies()->sync($request->technologies);
        }

        $this->syncGallery($request, $project, true);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created project',
            'module' => 'projects',
            'record_id' => $project->id,
        ]);

        return $this->successResponse($project->load(['industry', 'technologies', 'gallery']), 'Project created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string|max:500',
            'full_description' => 'sometimes|required|string',
            'client' => 'nullable|string',
            'industry_id' => 'nullable|exists:industries,id',
            'project_type' => 'sometimes|required|string',
            'challenges' => 'nullable|string',
            'solutions' => 'nullable|string',
            'results' => 'nullable|string',
            'project_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'featured' => 'boolean',
            'status' => 'sometimes|required|in:published,draft,archived',
            'technologies' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'featured_image_index' => 'nullable|integer',
            'featured_image_id' => 'nullable|integer',
            'remove_image_ids' => 'nullable|array',
        ]);

        $payload = collect($validated)
            ->except(['technologies', 'images', 'featured_image_index', 'featured_image_id', 'remove_image_ids'])
            ->all();

        if (isset($payload['title']) && $payload['title'] !== $project->title) {
            $payload['slug'] = Str::slug($payload['title']);
        }

        $project->update($payload);

        if ($request->has('technologies')) {
            $project->technologies()->sync($request->technologies);
        }

        $this->syncGallery($request, $project, false);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated project',
            'module' => 'projects',
            'record_id' => $project->id,
        ]);

        return $this->successResponse($project->load(['industry', 'technologies', 'gallery']), 'Project updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted project',
            'module' => 'projects',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Project deleted successfully');
    }

    private function syncGallery(Request $request, Project $project, bool $isCreate): void
    {
        if ($request->filled('remove_image_ids')) {
            $toRemove = $project->gallery()->whereIn('id', $request->input('remove_image_ids'))->get();
            foreach ($toRemove as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        $newPaths = [];
        if ($request->hasFile('images')) {
            $nextOrder = (int) $project->gallery()->max('sort_order');
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('projects', 'public');
                $project->gallery()->create([
                    'image_path' => $path,
                    'sort_order' => $nextOrder + $index + 1,
                ]);
                $newPaths[$index] = $path;
            }
        }

        if ($request->filled('featured_image_id')) {
            $image = ProjectImage::find($request->input('featured_image_id'));
            if ($image && $image->project_id === $project->id) {
                $project->featured_image = $image->image_path;
            }
        } elseif ($request->filled('featured_image_index') && array_key_exists((int) $request->input('featured_image_index'), $newPaths)) {
            $project->featured_image = $newPaths[(int) $request->input('featured_image_index')];
        } elseif ($isCreate && ! empty($newPaths)) {
            $project->featured_image = $newPaths[0];
        }

        if ($project->isDirty('featured_image')) {
            $project->save();
        }
    }
}
