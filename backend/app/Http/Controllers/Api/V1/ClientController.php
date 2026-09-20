<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\AuditLog;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::where('status', true)
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($clients);
    }

    public function adminIndex()
    {
        $clients = Client::orderBy('sort_order')->get();
        return $this->successResponse($clients);
    }

    public function show(int $id)
    {
        $client = Client::findOrFail($id);
        return $this->successResponse($client);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'website' => 'nullable|string',
            'industry' => 'nullable|string',
            'description' => 'nullable|string',
            'featured' => 'boolean',
            'status' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $client = Client::create($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Created client',
            'module' => 'clients',
            'record_id' => $client->id,
        ]);

        return $this->successResponse($client, 'Client created successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $client = Client::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'logo' => 'nullable|string',
            'website' => 'nullable|string',
            'industry' => 'nullable|string',
            'description' => 'nullable|string',
            'featured' => 'boolean',
            'status' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $client->update($validated);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Updated client',
            'module' => 'clients',
            'record_id' => $client->id,
        ]);

        return $this->successResponse($client, 'Client updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted client',
            'module' => 'clients',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Client deleted successfully');
    }
}
