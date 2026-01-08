<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Page extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['title', 'slug', 'status', 'meta_title'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Page '{$this->title}' {$eventName}");
    }

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

    /**
     * Get the full hierarchical path for this page.
     * Example: "tentang-kami/profil" for a child page under "Tentang Kami"
     */
    public function getFullPathAttribute(): string
    {
        $segments = collect([$this->slug]);
        $parent = $this->parent;

        while ($parent) {
            $segments->prepend($parent->slug);
            $parent = $parent->parent;
        }

        return $segments->implode('/');
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
