<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Model;

class JobPosition extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'department',
        'location',
        'employment_type',
        'salary_range',
        'description',
        'requirements',
        'is_active',
        'posted_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'posted_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
