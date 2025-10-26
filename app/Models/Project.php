<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'client_name',
        'cover_image',
        'summary',
        'description',
        'started_at',
        'completed_at',
        'status',
    ];

    protected $casts = [
        'started_at' => 'date',
        'completed_at' => 'date',
    ];
}
