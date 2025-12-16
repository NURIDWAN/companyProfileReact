<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Page extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'status',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'published_at',
        'display_order',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'meta_keywords' => 'array',
        'published_at' => 'datetime',
    ];

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('display_order');
    }

    public function sections()
    {
        return $this->hasMany(PageSection::class)->orderBy('display_order');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', 'published')
            ->where(function (Builder $sub) {
                $sub->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    protected static function booted(): void
    {
        static::creating(function (Page $page) {
            if (!$page->slug) {
                $page->slug = Str::slug($page->title);
            }
        });
    }
}
