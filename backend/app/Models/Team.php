<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'biography',
        'photo',
        'email',
        'linkedin',
        'skills',
        'department',
        'display_order',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'status' => 'boolean',
            'display_order' => 'integer',
        ];
    }
}
