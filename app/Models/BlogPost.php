<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'category_id',
        'title',
        'slug',
        'excerpt',
        'body',
        'cover_image',
        'meta_title',
        'meta_description',
        'og_title',
        'cta_variants',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'cta_variants' => 'array',
    ];

    protected $appends = ['cover_image_url'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->cover_image);
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
