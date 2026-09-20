<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Service;
use App\Models\ServiceImage;
use App\Models\AuditLog;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('status', 'active')
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($services);
    }

    public function show(string $slug)
    {
        $service = Service::with('gallery')->where('slug', $slug)->firstOrFail();
        return $this->successResponse($service);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_description' => 'required|string|max:500',
            'full_description' => 'required|string',
            'icon' => 'nullable|string',
            'features' => 'nullable|array',
            'technologies' => 'nullable|array',
            'status' => 'required|in:active,inactive,draft',
            'sort_order' => 'nullable|integer',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'featured_image_index' => 'nullable|integer',
        ]);

        $payload = collect($validated)->except(['images', 'featured_image_index'])->all();
        $payload['slug'] = Str::slug($payload['name']);
        $service = Service::create($payload);

        $this->syncGallery($request, $service, true);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created service',
            'module' => 'services',
            'record_id' => $service->id,
        ]);

        return $this->successResponse($service->load('gallery'), 'Service created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string|max:500',
            'full_description' => 'sometimes|required|string',
            'icon' => 'nullable|string',
            'features' => 'nullable|array',
            'technologies' => 'nullable|array',
            'status' => 'sometimes|required|in:active,inactive,draft',
            'sort_order' => 'nullable|integer',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'featured_image_index' => 'nullable|integer',
            'featured_image_id' => 'nullable|integer',
            'remove_image_ids' => 'nullable|array',
        ]);

        $payload = collect($validated)
            ->except(['images', 'featured_image_index', 'featured_image_id', 'remove_image_ids'])
            ->all();

        if (isset($payload['name']) && $payload['name'] !== $service->name) {
            $payload['slug'] = Str::slug($payload['name']);
        }

        $service->update($payload);

        $this->syncGallery($request, $service, false);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated service',
            'module' => 'services',
            'record_id' => $service->id,
        ]);

        return $this->successResponse($service->load('gallery'), 'Service updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted service',
            'module' => 'services',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Service deleted successfully');
    }

    private function syncGallery(Request $request, Service $service, bool $isCreate): void
    {
        if ($request->filled('remove_image_ids')) {
            $toRemove = $service->gallery()->whereIn('id', $request->input('remove_image_ids'))->get();
            foreach ($toRemove as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        $newPaths = [];
        if ($request->hasFile('images')) {
            $nextOrder = (int) $service->gallery()->max('sort_order');
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('services', 'public');
                $service->gallery()->create([
                    'image_path' => $path,
                    'sort_order' => $nextOrder + $index + 1,
                ]);
                $newPaths[$index] = $path;
            }
        }

        if ($request->filled('featured_image_id')) {
            $image = ServiceImage::find($request->input('featured_image_id'));
            if ($image && $image->service_id === $service->id) {
                $service->image = $image->image_path;
            }
        } elseif ($request->filled('featured_image_index') && array_key_exists((int) $request->input('featured_image_index'), $newPaths)) {
            $service->image = $newPaths[(int) $request->input('featured_image_index')];
        } elseif ($isCreate && ! empty($newPaths)) {
            $service->image = $newPaths[0];
        }

        if ($service->isDirty('image')) {
            $service->save();
        }
    }
}
