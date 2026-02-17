<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class GeminiRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'type',
        'model',
        'status',
        'summary',
        'options',
        'result',
        'error_message',
        'started_at',
        'finished_at',
        'duration_ms',
    ];

    protected $casts = [
        'options' => 'array',
        'result' => 'array',
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (GeminiRequest $request) {
            if (! $request->uuid) {
                $request->uuid = (string) Str::uuid();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
