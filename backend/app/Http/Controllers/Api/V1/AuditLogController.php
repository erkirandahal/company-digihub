<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\AuditLog;

class AuditLogController extends Controller
{
    public function index(Request $request)
    {
        $logs = AuditLog::with('user')
            ->latest()
            ->paginate($request->integer('per_page', 50));

        return $this->successResponse($logs);
    }
}
