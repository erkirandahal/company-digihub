<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\NewsletterSubscriber;
use App\Models\AuditLog;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'name' => 'nullable|string|max:255',
        ]);

        $subscriber = NewsletterSubscriber::updateOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'] ?? null,
                'status' => 'active',
                'subscribed_at' => now(),
                'unsubscribed_at' => null,
            ]
        );

        return $this->successResponse($subscriber, 'Subscribed successfully', 201);
    }

    public function index(Request $request)
    {
        $query = NewsletterSubscriber::latest();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        $subscribers = $query->paginate($request->integer('per_page', 1000));

        return $this->successResponse($subscribers->items(), 'Subscribers retrieved', 200, [
            'current_page' => $subscribers->currentPage(),
            'last_page' => $subscribers->lastPage(),
            'total' => $subscribers->total(),
        ]);
    }

    public function destroy(Request $request, int $id)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'Deleted newsletter subscriber',
            'module' => 'newsletter',
            'record_id' => $id,
        ]);

        return $this->successResponse([], 'Subscriber removed successfully');
    }
}
