<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PredictionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\QuestionController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/calculate-score', [QuestionController::class, 'calculateScore']);
Route::post('/predict-iq', [PredictionController::class, 'recommendIQ']);
Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/predict', [PredictionController::class, 'predict']);

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