<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Lead;
use App\Models\LeadActivity;
use App\Models\AuditLog;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::with(['assignedUser', 'activities'])->latest();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('priority') && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        return $this->successResponse($query->get());
    }

    public function show(int $id)
    {
        $lead = Lead::with(['assignedUser', 'activities.user'])->findOrFail($id);
        return $this->successResponse($lead);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'project_title' => 'required|string|max:255',
            'project_description' => 'required|string',
            'required_services' => 'nullable|array',
            'estimated_budget' => 'nullable|string',
            'timeline' => 'nullable|string',
            'preferred_contact_method' => 'nullable|string',
        ]);

        $lead = Lead::create($validated);

        LeadActivity::create([
            'lead_id' => $lead->id,
            'type' => 'note',
            'description' => 'Lead created via online Project Request form.',
        ]);

        return $this->successResponse($lead, 'Your project request has been submitted successfully. Our team will prepare a formal proposal.', 201);
    }

    public function update(Request $request, int $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|required|in:New,Contacted,In Progress,Converted,Closed,Spam',
            'priority' => 'sometimes|required|in:Low,Medium,High,Urgent',
            'assigned_to' => 'nullable|exists:users,id',
            'follow_up_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => "Updated lead #{$lead->id}",
            'module' => 'leads',
            'record_id' => $lead->id,
        ]);

        return $this->successResponse($lead->load('assignedUser'), 'Lead updated successfully');
    }

    public function addActivity(Request $request, int $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'type' => 'required|string|in:note,call,meeting,status_change,email',
            'description' => 'required|string',
            'attachment' => 'nullable|file|max:10240',
        ]);

        if ($request->hasFile('attachment')) {
            $validated['attachment_path'] = $request->file('attachment')->store('lead-attachments', 'public');
        }
        unset($validated['attachment']);

        $validated['lead_id'] = $lead->id;
        $validated['user_id'] = $request->user()?->id;

        $activity = LeadActivity::create($validated);

        return $this->successResponse($activity, 'Activity recorded', 201);
    }

    public function destroy(Request $request, int $id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => "Deleted lead #{$id}",
            'module' => 'leads',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Lead deleted successfully');
    }
}
