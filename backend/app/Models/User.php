<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'total_quizzes_taken',
        'average_score',
        'highest_score',
        'quiz_history',
        'iq_history',
        'current_level'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'quiz_history' => 'array',
        'iq_history' => 'array',
    ];

    // Update quiz statistics
    public function updateQuizStats($score, $total, $percentage, $iqScore, $iqLevel, $categoryPerformance = null)
    {
        $this->total_quizzes_taken++;
        
        // Update average score
        $totalScore = ($this->average_score * ($this->total_quizzes_taken - 1)) + $percentage;
        $this->average_score = round($totalScore / $this->total_quizzes_taken);
        
        // Update highest score
        if ($percentage > $this->highest_score) {
            $this->highest_score = $percentage;
        }
        
        // Add to quiz history
        $quizHistory = $this->quiz_history ?? [];
        $quizHistory[] = [
            'date' => now()->toDateTimeString(),
            'score' => $score,
            'total' => $total,
            'percentage' => $percentage,
            'iq_score' => $iqScore,
            'iq_level' => $iqLevel,
            'category_performance' => $categoryPerformance
        ];
        
        // Keep only last 10 quizzes
        if (count($quizHistory) > 10) {
            $quizHistory = array_slice($quizHistory, -10);
        }
        
        $this->quiz_history = $quizHistory;
        
        // Add to IQ history
        $iqHistory = $this->iq_history ?? [];
        $iqHistory[] = [
            'date' => now()->toDateTimeString(),
            'iq_score' => $iqScore,
            'iq_level' => $iqLevel,
            'percentage' => $percentage
        ];
        
        if (count($iqHistory) > 10) {
            $iqHistory = array_slice($iqHistory, -10);
        }
        
        $this->iq_history = $iqHistory;
        
        // Update current level based on average score
        if ($this->average_score >= 80) {
            $this->current_level = 'Advanced';
        } elseif ($this->average_score >= 60) {
            $this->current_level = 'Intermediate';
        } elseif ($this->average_score >= 40) {
            $this->current_level = 'Beginner';
        } else {
            $this->current_level = 'Foundation';
        }
        
        $this->save();
    }
    
    // Get predictions for this user
    public function predictions()
    {
        return $this->hasMany(Prediction::class);
    }
}