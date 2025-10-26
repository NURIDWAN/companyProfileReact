<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'cover_image',
        'thumbnail',
        'excerpt',
        'description',
        'category',
        'features',
        'price',
        'clients',
        'rating',
        'popular',
        'demo',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'clients' => 'integer',
        'rating' => 'decimal:1',
        'popular' => 'boolean',
        'demo' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = ['cover_image_url', 'thumbnail_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->cover_image);
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->thumbnail);
    }

    protected function resolveImageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }

        return $path;
    }
}
