<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopupEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'popup_id',
        'event_type',
        'ip_address',
        'user_agent',
    ];

    public function popup()
    {
        return $this->belongsTo(Popup::class);
    }
}
