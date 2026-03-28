<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PredictionController extends Controller
{
    // Get all questions from the QuestionController
    private function getQuestions()
    {
        $questionController = new \App\Http\Controllers\QuestionController();
        $response = $questionController->index();
        return $response->getData(true);
    }

   public function predict(Request $request)
{
    try {
        $userAnswers = $request->input('answers', []);
        $timeTaken = $request->input('time_taken', 0);
        $userId = $request->input('user_id', null);
        
        // ... existing calculation code ...
        
        // After calculating results and getting recommendation
        $quizResults = [ /* your results */ ];
        
        // Save to predictions table
        try {
            $prediction = \App\Models\Prediction::create([
                'user_id' => $userId,
                'score' => $score,
                'total_questions' => $total,
                'percentage' => $percentage,
                'weighted_percentage' => $weightedPercentage,
                'time_taken' => $timeTaken,
                'iq_score' => $recommendation['iq_score'] ?? null,
                'iq_level' => $recommendation['iq_level'] ?? null,
                'competency_level' => $recommendation['competency_level'] ?? null,
                'category_performance' => json_encode($categoryPerformance),
                'difficulty_performance' => json_encode($difficultyPerformance),
                'answers' => json_encode($userAnswers),
                'recommendations' => json_encode($recommendation['recommendations'] ?? [])
            ]);
            
            Log::info('Prediction saved to database', ['prediction_id' => $prediction->id]);
            
            // Update user statistics
            if ($userId) {
                $user = \App\Models\User::find($userId);
                if ($user) {
                    $user->updateQuizStats(
                        $score,
                        $total,
                        $percentage,
                        $recommendation['iq_score'] ?? 0,
                        $recommendation['iq_level'] ?? 'Beginner',
                        $categoryPerformance
                    );
                    Log::info('User stats updated', ['user_id' => $userId]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to save prediction: ' . $e->getMessage());
        }
        
        return response()->json($quizResults);
        
    } catch (\Exception $e) {
        // ... error handling ...
    }
}
}