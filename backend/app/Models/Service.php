<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'short_description',
        'full_description',
        'icon',
        'image',
        'features',
        'technologies',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'status',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'technologies' => 'array',
            'sort_order' => 'integer',
        ];
    }

    public function gallery()
    {
        return $this->hasMany(ServiceImage::class)->orderBy('sort_order');
    }
}
