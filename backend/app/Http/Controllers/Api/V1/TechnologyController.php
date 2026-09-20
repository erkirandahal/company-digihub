<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Technology;
use App\Models\AuditLog;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::where('status', true)
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($technologies);
    }

    public function show(int $id)
    {
        $technology = Technology::findOrFail($id);
        return $this->successResponse($technology);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:technology_categories,id',
            'category_name' => 'nullable|string',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
            'website_url' => 'nullable|string',
            'status' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $technology = Technology::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created technology',
            'module' => 'technologies',
            'record_id' => $technology->id,
        ]);

        return $this->successResponse($technology, 'Technology created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $technology = Technology::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'nullable|exists:technology_categories,id',
            'category_name' => 'nullable|string',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
            'website_url' => 'nullable|string',
            'status' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $technology->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $technology->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated technology',
            'module' => 'technologies',
            'record_id' => $technology->id,
        ]);

        return $this->successResponse($technology, 'Technology updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $technology = Technology::findOrFail($id);
        $technology->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted technology',
            'module' => 'technologies',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Technology deleted successfully');
    }
}
