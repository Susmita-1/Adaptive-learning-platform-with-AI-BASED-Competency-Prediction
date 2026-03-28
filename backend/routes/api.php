<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PredictionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\QuestionController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/calculate-score', [QuestionController::class, 'calculateScore']);
Route::post('/predict-iq', [PredictionController::class, 'recommendIQ']);
Route::get('/questions', [QuestionController::class, 'index']);
// Protected Routes (add user_id to requests)
Route::post('/predict', [PredictionController::class, 'predict']);
Route::get('/profile', [AuthController::class, 'profile']);
Route::get('/dashboard', [AuthController::class, 'dashboard']);

// this is for testing
Route::get('/test-fastapi', function() {
    try {
        $response = Http::timeout(5)->get('http://127.0.0.1:8000/health');
        return response()->json([
            'status' => 'connected',
            'fastapi_response' => $response->json()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});