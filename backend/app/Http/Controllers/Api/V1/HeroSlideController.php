<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\HeroSlide;
use App\Models\AuditLog;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::where('status', true)
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($slides);
    }

    public function adminIndex()
    {
        $slides = HeroSlide::orderBy('sort_order')->get();
        return $this->successResponse($slides);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'image' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'sort_order' => 'integer',
            'status' => 'boolean',
        ]);

        $slide = HeroSlide::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created hero slide: ' . $slide->title,
            'module' => 'hero_slides',
            'record_id' => $slide->id,
        ]);

        return $this->successResponse($slide, 'Hero slide created', 201);
    }

    public function update(Request $request, int $id)
    {
        $slide = HeroSlide::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'subtitle' => 'nullable|string',
            'image' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'sort_order' => 'integer',
            'status' => 'boolean',
        ]);

        $slide->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated hero slide #' . $id,
            'module' => 'hero_slides',
            'record_id' => $id,
        ]);

        return $this->successResponse($slide, 'Hero slide updated');
    }

    public function destroy(Request $request, int $id)
    {
        $slide = HeroSlide::findOrFail($id);
        $slide->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted hero slide #' . $id,
            'module' => 'hero_slides',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Hero slide deleted');
    }
}
