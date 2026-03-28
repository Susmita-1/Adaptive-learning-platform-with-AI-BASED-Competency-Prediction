<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = [
            // ENGLISH (10)
            [
                "id" => 1,
                "category" => "English",
                "question" => "Choose the correct synonym of 'Happy'",
                "options" => ["Sad", "Joyful", "Angry", "Tired"],
                "correct_answer" => "Joyful"
            ],
            [
                "id" => 2,
                "category" => "English",
                "question" => "Antonym of 'Fast'?",
                "options" => ["Quick", "Rapid", "Slow", "Swift"],
                "correct_answer" => "Slow"
            ],
            [
                "id" => 3,
                "category" => "English",
                "question" => "Fill in the blank: She ___ going to school.",
                "options" => ["is", "are", "am", "be"],
                "correct_answer" => "is"
            ],
            [
                "id" => 4,
                "category" => "English",
                "question" => "Plural of 'Child'?",
                "options" => ["Childs", "Children", "Childes", "Childrens"],
                "correct_answer" => "Children"
            ],
            [
                "id" => 5,
                "category" => "English",
                "question" => "Which is a noun?",
                "options" => ["Run", "Quickly", "Happiness", "Fast"],
                "correct_answer" => "Happiness"
            ],
            [
                "id" => 6,
                "category" => "English",
                "question" => "Choose correct spelling:",
                "options" => ["Recieve", "Receive", "Recive", "Receve"],
                "correct_answer" => "Receive"
            ],
            [
                "id" => 7,
                "category" => "English",
                "question" => "Opposite of 'Big'?",
                "options" => ["Huge", "Large", "Small", "Wide"],
                "correct_answer" => "Small"
            ],
            [
                "id" => 8,
                "category" => "English",
                "question" => "He ___ a book.",
                "options" => ["read", "reads", "reading", "reader"],
                "correct_answer" => "reads"
            ],
            [
                "id" => 9,
                "category" => "English",
                "question" => "Which is a verb?",
                "options" => ["Table", "Run", "Blue", "Happy"],
                "correct_answer" => "Run"
            ],
            [
                "id" => 10,
                "category" => "English",
                "question" => "Choose correct sentence:",
                "options" => [
                    "She go to school",
                    "She goes to school",
                    "She going school",
                    "She gone school"
                ],
                "correct_answer" => "She goes to school"
            ],
        ];

        // Return as JSON array directly
        return response()->json($questions);
    }
}