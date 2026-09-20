<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\ContactInquiry;
use App\Models\InquiryActivity;
use App\Models\AuditLog;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactInquiry::with('activities')->latest();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $inquiries = $query->get();
        return $this->successResponse($inquiries);
    }

    public function show(int $id)
    {
        $inquiry = ContactInquiry::with('activities.user')->findOrFail($id);
        $inquiry->update(['is_read' => true]);

        return $this->successResponse($inquiry);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
            'service_interested_in' => 'nullable|string',
            'budget_range' => 'nullable|string',
            'preferred_contact_method' => 'nullable|string',
        ]);

        $inquiry = ContactInquiry::create($validated);

        return $this->successResponse($inquiry, 'Your inquiry has been received. Our engineering team will contact you shortly.', 201);
    }

    public function updateStatus(Request $request, int $id)
    {
        $inquiry = ContactInquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:New,Contacted,In Progress,Converted,Closed,Spam',
            'notes' => 'nullable|string',
        ]);

        $inquiry->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => "Updated inquiry status to {$validated['status']}",
            'module' => 'inquiries',
            'record_id' => $inquiry->id,
        ]);

        return $this->successResponse($inquiry, 'Inquiry status updated');
    }

    public function destroy(Request $request, int $id)
    {
        $inquiry = ContactInquiry::findOrFail($id);
        $inquiry->delete();

        return $this->successResponse([], 'Inquiry deleted');
    }

    public function addActivity(Request $request, int $id)
    {
        $inquiry = ContactInquiry::findOrFail($id);

        $validated = $request->validate([
            'type' => 'required|string|in:note,call,meeting,status_change,email',
            'description' => 'required|string',
        ]);

        $validated['contact_inquiry_id'] = $inquiry->id;
        $validated['user_id'] = $request->user()?->id;

        $activity = InquiryActivity::create($validated);

        return $this->successResponse($activity, 'Activity recorded', 201);
    }
}
