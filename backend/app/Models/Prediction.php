<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    protected $fillable = [
        'user_id',
        'score',
        'total_questions',
        'percentage',
        'weighted_percentage',
        'time_taken',
        'iq_score',
        'iq_level',
        'competency_level',
        'category_performance',
        'difficulty_performance',
        'answers',
        'recommendations'
    ];
    
    protected $casts = [
        'category_performance' => 'array',
        'difficulty_performance' => 'array',
        'answers' => 'array',
        'recommendations' => 'array'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}