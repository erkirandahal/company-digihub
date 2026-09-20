<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'company',
        'email',
        'phone',
        'project_title',
        'project_description',
        'required_services',
        'estimated_budget',
        'timeline',
        'preferred_contact_method',
        'attachments',
        'status',
        'priority',
        'assigned_to',
        'follow_up_date',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'required_services' => 'array',
            'attachments' => 'array',
            'follow_up_date' => 'date',
        ];
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function activities()
    {
        return $this->hasMany(LeadActivity::class)->latest();
    }
}
