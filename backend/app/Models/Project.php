<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'full_description',
        'featured_image',
        'client',
        'industry_id',
        'project_type',
        'start_date',
        'completion_date',
        'project_url',
        'github_url',
        'challenges',
        'solutions',
        'results',
        'status',
        'featured',
        'seo_title',
        'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'completion_date' => 'date',
            'featured' => 'boolean',
        ];
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }

    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'project_technology');
    }

    public function gallery()
    {
        return $this->hasMany(ProjectImage::class)->orderBy('sort_order');
    }

    public function relatedBlog()
    {
        return $this->hasOne(Blog::class, 'related_project_id');
    }
}
