<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\AuditLog;

class TeamController extends Controller
{
    public function index()
    {
        $team = Team::where('status', true)
            ->orderBy('display_order')
            ->get();

        return $this->successResponse($team);
    }

    public function adminIndex()
    {
        $team = Team::orderBy('display_order')->get();
        return $this->successResponse($team);
    }

    public function show(int $id)
    {
        $member = Team::findOrFail($id);
        return $this->successResponse($member);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'photo' => 'nullable|string',
            'email' => 'nullable|email',
            'linkedin' => 'nullable|string',
            'skills' => 'nullable|array',
            'department' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'status' => 'boolean',
        ]);

        $member = Team::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created team member',
            'module' => 'team',
            'record_id' => $member->id,
        ]);

        return $this->successResponse($member, 'Team member created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $member = Team::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'biography' => 'nullable|string',
            'photo' => 'nullable|string',
            'email' => 'nullable|email',
            'linkedin' => 'nullable|string',
            'skills' => 'nullable|array',
            'department' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'status' => 'boolean',
        ]);

        $member->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated team member',
            'module' => 'team',
            'record_id' => $member->id,
        ]);

        return $this->successResponse($member, 'Team member updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $member = Team::findOrFail($id);
        $member->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted team member',
            'module' => 'team',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Team member deleted successfully');
    }
}
