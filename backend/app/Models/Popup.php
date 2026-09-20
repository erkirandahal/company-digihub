<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'image_width',
        'button_text',
        'button_url',
        'type',
        'status',
        'priority',
        'start_date',
        'end_date',
        'target_pages',
        'device_targeting',
        'frequency',
        'delay_seconds',
        'scroll_percentage',
        'impressions_count',
        'clicks_count',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'priority' => 'integer',
            'delay_seconds' => 'integer',
            'scroll_percentage' => 'integer',
            'impressions_count' => 'integer',
            'clicks_count' => 'integer',
            'start_date' => 'datetime',
            'end_date' => 'datetime',
        ];
    }

    public function events()
    {
        return $this->hasMany(PopupEvent::class);
    }
}
