<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PredictionController extends Controller
{
    private function getQuestions()
    {
        return [
            ["id" => 1, "category" => "English", "question" => "Choose the correct synonym of 'Happy'", "options" => ["Sad", "Joyful", "Angry", "Tired"], "correct_answer" => "Joyful"],
            ["id" => 2, "category" => "English", "question" => "Antonym of 'Fast'?", "options" => ["Quick", "Rapid", "Slow", "Swift"], "correct_answer" => "Slow"],
            ["id" => 3, "category" => "English", "question" => "Fill in the blank: She ___ going to school.", "options" => ["is", "are", "am", "be"], "correct_answer" => "is"],
            ["id" => 4, "category" => "English", "question" => "Plural of 'Child'?", "options" => ["Childs", "Children", "Childes", "Childrens"], "correct_answer" => "Children"],
            ["id" => 5, "category" => "English", "question" => "Which is a noun?", "options" => ["Run", "Quickly", "Happiness", "Fast"], "correct_answer" => "Happiness"],
            ["id" => 6, "category" => "English", "question" => "Choose correct spelling:", "options" => ["Recieve", "Receive", "Recive", "Receve"], "correct_answer" => "Receive"],
            ["id" => 7, "category" => "English", "question" => "Opposite of 'Big'?", "options" => ["Huge", "Large", "Small", "Wide"], "correct_answer" => "Small"],
            ["id" => 8, "category" => "English", "question" => "He ___ a book.", "options" => ["read", "reads", "reading", "reader"], "correct_answer" => "reads"],
            ["id" => 9, "category" => "English", "question" => "Which is a verb?", "options" => ["Table", "Run", "Blue", "Happy"], "correct_answer" => "Run"],
            ["id" => 10, "category" => "English", "question" => "Choose correct sentence:", "options" => ["She go to school", "She goes to school", "She going school", "She gone school"], "correct_answer" => "She goes to school"],
        ];
    }

    public function predict(Request $request)
    {
        try {
            // Get answers from frontend
            $userAnswers = $request->input('answers', []);
            $timeTaken = $request->input('time_taken', 0);
            
            Log::info('Quiz submitted', ['answers' => $userAnswers, 'time' => $timeTaken]);
            
            // Get questions and calculate score
            $questions = $this->getQuestions();
            $total = count($questions);
            $score = 0;
            $correctAnswers = [];
            $wrongAnswers = [];
            $categoryPerformance = [];
            
            foreach ($questions as $question) {
                $questionId = (string)$question['id'];
                $userAnswer = isset($userAnswers[$questionId]) ? $userAnswers[$questionId] : null;
                $correctAnswer = $question['correct_answer'];
                $isCorrect = ($userAnswer === $correctAnswer);
                $category = $question['category'];
                
                if ($isCorrect) {
                    $score++;
                    $correctAnswers[] = [
                        'id' => $questionId,
                        'category' => $category,
                        'question' => $question['question'],
                        'user_answer' => $userAnswer,
                        'correct_answer' => $correctAnswer
                    ];
                } else {
                    $wrongAnswers[] = [
                        'id' => $questionId,
                        'category' => $category,
                        'question' => $question['question'],
                        'user_answer' => $userAnswer ?: 'Not answered',
                        'correct_answer' => $correctAnswer
                    ];
                }
                
                // Track category performance
                if (!isset($categoryPerformance[$category])) {
                    $categoryPerformance[$category] = [
                        'total' => 0,
                        'correct' => 0,
                        'incorrect' => 0,
                        'percentage' => 0
                    ];
                }
                $categoryPerformance[$category]['total']++;
                if ($isCorrect) {
                    $categoryPerformance[$category]['correct']++;
                } else {
                    $categoryPerformance[$category]['incorrect']++;
                }
            }
            
            // Calculate percentages
            $percentage = round(($score / $total) * 100, 2);
            foreach ($categoryPerformance as $category => $data) {
                $categoryPerformance[$category]['percentage'] = 
                    round(($data['correct'] / $data['total']) * 100, 2);
            }
            
            // Prepare quiz results
            $quizResults = [
                'success' => true,
                'score' => $score,
                'total' => $total,
                'percentage' => $percentage,
                'time_taken' => $timeTaken,
                'correct_count' => count($correctAnswers),
                'wrong_count' => count($wrongAnswers),
                'correct_answers' => $correctAnswers,
                'wrong_answers' => $wrongAnswers,
                'category_performance' => $categoryPerformance
            ];
            
            // Call FastAPI for IQ recommendation
            $recommendation = null;
            try {
                Log::info('Calling FastAPI at http://127.0.0.1:8000/recommend');
                
                $fastApiResponse = Http::timeout(10)->post('http://127.0.0.1:8000/recommend', [
                    'score' => $score,
                    'total' => $total,
                    'percentage' => $percentage,
                    'time_taken' => $timeTaken,
                    'correct_count' => count($correctAnswers),
                    'wrong_count' => count($wrongAnswers),
                    'category_performance' => $categoryPerformance
                ]);
                
                Log::info('FastAPI response status: ' . $fastApiResponse->status());
                
                if ($fastApiResponse->successful()) {
                    $recommendation = $fastApiResponse->json();
                    Log::info('FastAPI recommendation received successfully', $recommendation);
                } else {
                    Log::error('FastAPI error response: ' . $fastApiResponse->body());
                }
            } catch (\Exception $e) {
                Log::error('FastAPI connection error: ' . $e->getMessage());
                Log::error('Error details: ' . $e->getTraceAsString());
            }
            
            // Add recommendation to results
            $quizResults['recommendation'] = $recommendation;
            
            Log::info('Final results prepared', [
                'has_recommendation' => $recommendation ? 'Yes' : 'No',
                'score' => $score,
                'total' => $total
            ]);
            
            return response()->json($quizResults);
            
        } catch (\Exception $e) {
            Log::error('Error calculating quiz results: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}