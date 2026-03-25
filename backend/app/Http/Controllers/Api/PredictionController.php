<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PredictionController extends Controller
{
    public function predict(Request $request)
    {
        $response = Http::post('http://127.0.0.1:8000/predict', [
            'score' => $request->score,
            'accuracy' => $request->accuracy,
            'time_taken' => $request->time_taken,
        ]);

        return response()->json($response->json());
    }
}