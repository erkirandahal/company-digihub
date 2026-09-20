<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\AuditLog;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->latest()->get();
        return $this->successResponse($users);
    }

    public function show(int $id)
    {
        $user = User::with('role')->findOrFail($id);
        return $this->successResponse($user);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'avatar' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created user',
            'module' => 'users',
            'record_id' => $user->id,
        ]);

        return $this->successResponse($user->load('role'), 'User created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'avatar' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (! empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated user',
            'module' => 'users',
            'record_id' => $user->id,
        ]);

        return $this->successResponse($user->load('role'), 'User updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted user',
            'module' => 'users',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'User deleted successfully');
    }
}
