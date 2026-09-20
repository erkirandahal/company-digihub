<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Career extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'job_title',
        'slug',
        'department',
        'location',
        'employment_type',
        'experience',
        'salary_information',
        'description',
        'responsibilities',
        'requirements',
        'skills',
        'benefits',
        'deadline',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'responsibilities' => 'array',
            'requirements' => 'array',
            'skills' => 'array',
            'benefits' => 'array',
            'deadline' => 'date',
        ];
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
