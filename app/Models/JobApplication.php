<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_position_id',
        'name',
        'email',
        'phone',
        'linkedin_url',
        'portfolio_url',
        'resume_path',
        'cover_letter',
        'status',
    ];

    public function jobPosition()
    {
        return $this->belongsTo(JobPosition::class);
    }
}
