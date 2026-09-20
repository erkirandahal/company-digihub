<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Testimonial;
use App\Models\AuditLog;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::where('status', true)
            ->latest()
            ->get();

        return $this->successResponse($testimonials);
    }

    public function show(int $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        return $this->successResponse($testimonial);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'testimonial' => 'required|string',
            'photo' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'featured' => 'boolean',
            'status' => 'boolean',
        ]);

        $testimonial = Testimonial::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created testimonial',
            'module' => 'testimonials',
            'record_id' => $testimonial->id,
        ]);

        return $this->successResponse($testimonial, 'Testimonial created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'client_name' => 'sometimes|required|string|max:255',
            'position' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'testimonial' => 'sometimes|required|string',
            'photo' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'featured' => 'boolean',
            'status' => 'boolean',
        ]);

        $testimonial->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated testimonial',
            'module' => 'testimonials',
            'record_id' => $testimonial->id,
        ]);

        return $this->successResponse($testimonial, 'Testimonial updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted testimonial',
            'module' => 'testimonials',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Testimonial deleted successfully');
    }
}
