<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Career;
use App\Models\AuditLog;

class CareerController extends Controller
{
    public function index()
    {
        $careers = Career::where('status', 'active')
            ->latest()
            ->get();

        return $this->successResponse($careers);
    }

    public function show(string $slug)
    {
        $career = Career::where('slug', $slug)->firstOrFail();
        return $this->successResponse($career);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'department' => 'nullable|string',
            'location' => 'nullable|string',
            'employment_type' => 'required|in:Full-time,Part-time,Contract,Internship',
            'experience' => 'nullable|string',
            'salary_information' => 'nullable|string',
            'description' => 'required|string',
            'responsibilities' => 'nullable|array',
            'requirements' => 'nullable|array',
            'skills' => 'nullable|array',
            'benefits' => 'nullable|array',
            'deadline' => 'nullable|date',
            'status' => 'required|in:active,closed,draft',
        ]);

        $validated['slug'] = Str::slug($validated['job_title']) . '-' . rand(1000, 9999);
        $career = Career::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created career opening',
            'module' => 'careers',
            'record_id' => $career->id,
        ]);

        return $this->successResponse($career, 'Career opening created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $career = Career::findOrFail($id);

        $validated = $request->validate([
            'job_title' => 'sometimes|required|string|max:255',
            'department' => 'nullable|string',
            'location' => 'nullable|string',
            'employment_type' => 'sometimes|required|in:Full-time,Part-time,Contract,Internship',
            'experience' => 'nullable|string',
            'salary_information' => 'nullable|string',
            'description' => 'sometimes|required|string',
            'responsibilities' => 'nullable|array',
            'requirements' => 'nullable|array',
            'skills' => 'nullable|array',
            'benefits' => 'nullable|array',
            'deadline' => 'nullable|date',
            'status' => 'sometimes|required|in:active,closed,draft',
        ]);

        if (isset($validated['job_title']) && $validated['job_title'] !== $career->job_title) {
            $validated['slug'] = Str::slug($validated['job_title']) . '-' . rand(1000, 9999);
        }

        $career->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated career opening',
            'module' => 'careers',
            'record_id' => $career->id,
        ]);

        return $this->successResponse($career, 'Career opening updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $career = Career::findOrFail($id);
        $career->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted career opening',
            'module' => 'careers',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Career opening deleted successfully');
    }
}
