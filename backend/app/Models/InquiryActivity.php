<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InquiryActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_inquiry_id',
        'user_id',
        'type',
        'description',
    ];

    public function inquiry()
    {
        return $this->belongsTo(ContactInquiry::class, 'contact_inquiry_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
