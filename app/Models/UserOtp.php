<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserOtp extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'code',
        'attempts',
        'expires_at',
        'consumed_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'consumed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('consumed_at')->where('expires_at', '>=', now());
    }

    public function markConsumed(): void
    {
        $this->forceFill([
            'consumed_at' => now(),
        ])->save();
    }

    public function incrementAttempts(): void
    {
        $this->forceFill([
            'attempts' => $this->attempts + 1,
        ])->save();
    }
}
