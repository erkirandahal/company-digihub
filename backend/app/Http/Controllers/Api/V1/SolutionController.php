<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Solution;
use App\Models\AuditLog;

class SolutionController extends Controller
{
    public function index()
    {
        $solutions = Solution::where('status', 'active')
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($solutions);
    }

    public function show(string $slug)
    {
        $solution = Solution::where('slug', $slug)->firstOrFail();
        return $this->successResponse($solution);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:500',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'benefits' => 'nullable|array',
            'technologies' => 'nullable|array',
            'icon' => 'nullable|string',
            'status' => 'required|in:active,inactive,draft',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $solution = Solution::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created solution',
            'module' => 'solutions',
            'record_id' => $solution->id,
        ]);

        return $this->successResponse($solution, 'Solution created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $solution = Solution::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string|max:500',
            'description' => 'sometimes|required|string',
            'features' => 'nullable|array',
            'benefits' => 'nullable|array',
            'technologies' => 'nullable|array',
            'icon' => 'nullable|string',
            'status' => 'sometimes|required|in:active,inactive,draft',
            'sort_order' => 'nullable|integer',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $solution->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $solution->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated solution',
            'module' => 'solutions',
            'record_id' => $solution->id,
        ]);

        return $this->successResponse($solution, 'Solution updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $solution = Solution::findOrFail($id);
        $solution->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted solution',
            'module' => 'solutions',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Solution deleted successfully');
    }
}
