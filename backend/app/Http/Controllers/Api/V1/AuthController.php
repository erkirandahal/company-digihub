<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\AuditLog;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::with('role.permissions')->where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        if (!$user->is_active) {
            return $this->errorResponse('Your administrative account has been deactivated.', 403);
        }

        // Generate Sanctum token
        $token = $user->createToken('admin-token')->plainTextToken;

        // Log audit event
        AuditLog::create([
            'user_id' => $user->id,
            'action' => 'Admin Login',
            'module' => 'auth',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ? $user->role->name : 'Administrator',
                'role_slug' => $user->role ? $user->role->slug : 'admin',
                'avatar' => $user->avatar,
            ],
            'token' => $token,
        ], 'Authentication successful');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->successResponse([], 'Logged out successfully');
    }

    public function user(Request $request)
    {
        $user = $request->user()->load('role');

        return $this->successResponse([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ? $user->role->name : 'Administrator',
            'role_slug' => $user->role ? $user->role->slug : 'admin',
            'avatar' => $user->avatar,
        ]);
    }
}
