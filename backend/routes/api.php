<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PredictionController;

Route::post('/predict', [PredictionController::class, 'predict']);