<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Popup;
use App\Models\PopupEvent;

class PopupController extends Controller
{
    public function getActive(Request $request)
    {
        $page = $request->query('page', 'home');

        $now = now();

        $popup = Popup::where('status', true)
            ->where(function ($q) use ($page) {
                $q->where('target_pages', 'all')
                  ->orWhere('target_pages', $page);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('start_date')->orWhere('start_date', '<=', $now);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', $now);
            })
            ->orderByDesc('priority')
            ->orderByDesc('id')
            ->first();

        return $this->successResponse($popup);
    }

    public function recordImpression(Request $request, int $id)
    {
        $popup = Popup::findOrFail($id);
        $popup->increment('impressions_count');

        PopupEvent::create([
            'popup_id' => $id,
            'event_type' => 'impression',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return $this->successResponse([], 'Impression logged');
    }

    public function recordClick(Request $request, int $id)
    {
        $popup = Popup::findOrFail($id);
        $popup->increment('clicks_count');

        PopupEvent::create([
            'popup_id' => $id,
            'event_type' => 'click',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return $this->successResponse([], 'Click logged');
    }

    public function index()
    {
        $popups = Popup::orderByDesc('priority')->get();
        return $this->successResponse($popups);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_width' => 'nullable|integer|min:100|max:1200',
            'button_text' => 'nullable|string',
            'button_url' => 'nullable|string',
            'type' => 'required|string',
            'status' => 'boolean',
            'priority' => 'integer',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'target_pages' => 'nullable|string',
            'device_targeting' => 'nullable|string',
            'frequency' => 'required|in:every_visit,once_session,once_day,once_week,once_ever',
            'delay_seconds' => 'integer',
            'scroll_percentage' => 'integer',
        ]);

        $popup = Popup::create($validated);
        return $this->successResponse($popup, 'Popup created', 201);
    }

    public function update(Request $request, int $id)
    {
        $popup = Popup::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_width' => 'nullable|integer|min:100|max:1200',
            'button_text' => 'nullable|string',
            'button_url' => 'nullable|string',
            'type' => 'sometimes|required|string',
            'status' => 'boolean',
            'priority' => 'integer',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'target_pages' => 'nullable|string',
            'device_targeting' => 'nullable|string',
            'frequency' => 'sometimes|required|in:every_visit,once_session,once_day,once_week,once_ever',
            'delay_seconds' => 'integer',
            'scroll_percentage' => 'integer',
        ]);

        $popup->update($validated);
        return $this->successResponse($popup, 'Popup updated');
    }

    public function destroy(int $id)
    {
        $popup = Popup::findOrFail($id);
        $popup->delete();
        return $this->successResponse([], 'Popup deleted');
    }
}
