<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    protected $fillable = [
        'score',
        'accuracy',
        'time_taken',
        'predicted_level'
    ];
}