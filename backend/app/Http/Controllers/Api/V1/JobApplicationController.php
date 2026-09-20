<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Career;
use App\Models\JobApplication;
use App\Models\AuditLog;

class JobApplicationController extends Controller
{
    public function index()
    {
        $applications = JobApplication::with('career')->latest()->get();
        return $this->successResponse($applications);
    }

    public function show(int $id)
    {
        $application = JobApplication::with('career')->findOrFail($id);
        return $this->successResponse($application);
    }

    public function store(Request $request, string $slug)
    {
        $career = Career::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'cover_letter' => 'nullable|string',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:5120',
            'portfolio_url' => 'nullable|string',
            'linkedin_url' => 'nullable|string',
        ]);

        if ($request->hasFile('resume')) {
            $validated['resume_path'] = $request->file('resume')->store('resumes', 'public');
        }
        unset($validated['resume']);

        $validated['career_id'] = $career->id;
        $application = JobApplication::create($validated);

        return $this->successResponse($application, 'Application submitted successfully', 201);
    }

    public function updateStatus(Request $request, int $id)
    {
        $application = JobApplication::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:New,Reviewing,Shortlisted,Interview,Selected,Rejected',
            'admin_notes' => 'nullable|string',
        ]);

        $application->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated job application status',
            'module' => 'job_applications',
            'record_id' => $application->id,
        ]);

        return $this->successResponse($application, 'Application status updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $application = JobApplication::findOrFail($id);
        $application->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted job application',
            'module' => 'job_applications',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Application deleted successfully');
    }
}
