<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Industry;
use App\Models\AuditLog;

class IndustryController extends Controller
{
    public function index()
    {
        $industries = Industry::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($industries);
    }

    public function show(int $id)
    {
        $industry = Industry::findOrFail($id);
        return $this->successResponse($industry);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $industry = Industry::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created industry',
            'module' => 'industries',
            'record_id' => $industry->id,
        ]);

        return $this->successResponse($industry, 'Industry created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $industry = Industry::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $industry->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $industry->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated industry',
            'module' => 'industries',
            'record_id' => $industry->id,
        ]);

        return $this->successResponse($industry, 'Industry updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $industry = Industry::findOrFail($id);
        $industry->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted industry',
            'module' => 'industries',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Industry deleted successfully');
    }
}
