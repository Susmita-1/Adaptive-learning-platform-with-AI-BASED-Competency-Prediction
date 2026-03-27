<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Prediction; // ✅ important

class PredictionController extends Controller
{
    public function predict(Request $request)
    {
        // Call FastAPI
        $response = Http::post('http://127.0.0.1:8000/predict', [
            'score' => $request->score,
            'accuracy' => $request->accuracy,
            'time_taken' => $request->time_taken,
        ]);

        $data = $response->json();

        // ✅ Save into MySQL
        Prediction::create([
            'score' => $request->score,
            'accuracy' => $request->accuracy,
            'time_taken' => $request->time_taken,
            'predicted_level' => $data['predicted_level']
        ]);

        return response()->json($data);
    }
}