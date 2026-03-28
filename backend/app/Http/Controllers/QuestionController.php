<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = [
            // ==================== ENGLISH (15 Questions) ====================
            [
                "id" => 1,
                "category" => "English",
                "question" => "Choose the correct synonym of 'Happy'",
                "options" => ["Sad", "Joyful", "Angry", "Tired"],
                "correct_answer" => "Joyful",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 2,
                "category" => "English",
                "question" => "Antonym of 'Fast'?",
                "options" => ["Quick", "Rapid", "Slow", "Swift"],
                "correct_answer" => "Slow",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 3,
                "category" => "English",
                "question" => "Fill in the blank: She ___ going to school.",
                "options" => ["is", "are", "am", "be"],
                "correct_answer" => "is",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 4,
                "category" => "English",
                "question" => "Plural of 'Child'?",
                "options" => ["Childs", "Children", "Childes", "Childrens"],
                "correct_answer" => "Children",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 5,
                "category" => "English",
                "question" => "Which is a noun?",
                "options" => ["Run", "Quickly", "Happiness", "Fast"],
                "correct_answer" => "Happiness",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 6,
                "category" => "English",
                "question" => "Choose correct spelling:",
                "options" => ["Recieve", "Receive", "Recive", "Receve"],
                "correct_answer" => "Receive",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 7,
                "category" => "English",
                "question" => "Opposite of 'Big'?",
                "options" => ["Huge", "Large", "Small", "Wide"],
                "correct_answer" => "Small",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 8,
                "category" => "English",
                "question" => "He ___ a book.",
                "options" => ["read", "reads", "reading", "reader"],
                "correct_answer" => "reads",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 9,
                "category" => "English",
                "question" => "Which is a verb?",
                "options" => ["Table", "Run", "Blue", "Happy"],
                "correct_answer" => "Run",
                "difficulty" => "easy",
                "points" => 1
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
                "correct_answer" => "She goes to school",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 11,
                "category" => "English",
                "question" => "What is the past tense of 'go'?",
                "options" => ["Goed", "Went", "Gone", "Going"],
                "correct_answer" => "Went",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 12,
                "category" => "English",
                "question" => "Choose the correct article: ___ apple a day keeps the doctor away.",
                "options" => ["A", "An", "The", "None"],
                "correct_answer" => "An",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 13,
                "category" => "English",
                "question" => "What is the synonym of 'Beautiful'?",
                "options" => ["Ugly", "Pretty", "Awful", "Bad"],
                "correct_answer" => "Pretty",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 14,
                "category" => "English",
                "question" => "Which word is an adjective?",
                "options" => ["Run", "Quickly", "Beautiful", "School"],
                "correct_answer" => "Beautiful",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 15,
                "category" => "English",
                "question" => "What is the opposite of 'Brave'?",
                "options" => ["Courageous", "Fearless", "Cowardly", "Bold"],
                "correct_answer" => "Cowardly",
                "difficulty" => "medium",
                "points" => 2
            ],

            // ==================== MATH (15 Questions) ====================
            [
                "id" => 16,
                "category" => "Math",
                "question" => "What is 25 + 37?",
                "options" => ["52", "62", "72", "82"],
                "correct_answer" => "62",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 17,
                "category" => "Math",
                "question" => "What is 15 × 4?",
                "options" => ["45", "50", "60", "65"],
                "correct_answer" => "60",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 18,
                "category" => "Math",
                "question" => "What is 100 ÷ 5?",
                "options" => ["15", "20", "25", "30"],
                "correct_answer" => "20",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 19,
                "category" => "Math",
                "question" => "What is the square root of 144?",
                "options" => ["10", "11", "12", "13"],
                "correct_answer" => "12",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 20,
                "category" => "Math",
                "question" => "What is 20% of 150?",
                "options" => ["20", "25", "30", "35"],
                "correct_answer" => "30",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 21,
                "category" => "Math",
                "question" => "If x + 5 = 12, what is x?",
                "options" => ["5", "6", "7", "8"],
                "correct_answer" => "7",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 22,
                "category" => "Math",
                "question" => "What is 3² + 4²?",
                "options" => ["5", "7", "12", "25"],
                "correct_answer" => "25",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 23,
                "category" => "Math",
                "question" => "What is the area of a rectangle with length 8 and width 5?",
                "options" => ["13", "26", "40", "80"],
                "correct_answer" => "40",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 24,
                "category" => "Math",
                "question" => "What is 7 × 8?",
                "options" => ["48", "56", "64", "72"],
                "correct_answer" => "56",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 25,
                "category" => "Math",
                "question" => "What is 99 - 47?",
                "options" => ["42", "52", "62", "72"],
                "correct_answer" => "52",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 26,
                "category" => "Math",
                "question" => "What is the value of π (pi) approximately?",
                "options" => ["3.14", "3.41", "3.24", "3.04"],
                "correct_answer" => "3.14",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 27,
                "category" => "Math",
                "question" => "What is 5! (5 factorial)?",
                "options" => ["60", "100", "120", "150"],
                "correct_answer" => "120",
                "difficulty" => "hard",
                "points" => 3
            ],
            [
                "id" => 28,
                "category" => "Math",
                "question" => "What is the perimeter of a square with side 6?",
                "options" => ["12", "24", "36", "48"],
                "correct_answer" => "24",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 29,
                "category" => "Math",
                "question" => "If 2x = 16, what is x?",
                "options" => ["4", "6", "8", "10"],
                "correct_answer" => "8",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 30,
                "category" => "Math",
                "question" => "What is the sum of angles in a triangle?",
                "options" => ["90°", "180°", "270°", "360°"],
                "correct_answer" => "180°",
                "difficulty" => "easy",
                "points" => 1
            ],

            // ==================== SCIENCE (15 Questions) ====================
            [
                "id" => 31,
                "category" => "Science",
                "question" => "What is the chemical symbol for Gold?",
                "options" => ["Go", "Gd", "Au", "Ag"],
                "correct_answer" => "Au",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 32,
                "category" => "Science",
                "question" => "What is the hardest natural substance?",
                "options" => ["Iron", "Diamond", "Platinum", "Steel"],
                "correct_answer" => "Diamond",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 33,
                "category" => "Science",
                "question" => "Which planet is known as the Red Planet?",
                "options" => ["Venus", "Mars", "Jupiter", "Saturn"],
                "correct_answer" => "Mars",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 34,
                "category" => "Science",
                "question" => "What is the process by which plants make food?",
                "options" => ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
                "correct_answer" => "Photosynthesis",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 35,
                "category" => "Science",
                "question" => "What is the chemical formula for water?",
                "options" => ["CO2", "H2O", "O2", "NaCl"],
                "correct_answer" => "H2O",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 36,
                "category" => "Science",
                "question" => "What is the closest star to Earth?",
                "options" => ["Proxima Centauri", "Alpha Centauri", "The Moon", "The Sun"],
                "correct_answer" => "The Sun",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 37,
                "category" => "Science",
                "question" => "What is the boiling point of water in Celsius?",
                "options" => ["0°C", "50°C", "100°C", "150°C"],
                "correct_answer" => "100°C",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 38,
                "category" => "Science",
                "question" => "What gas do humans breathe in?",
                "options" => ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
                "correct_answer" => "Oxygen",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 39,
                "category" => "Science",
                "question" => "What is the largest organ in the human body?",
                "options" => ["Heart", "Liver", "Skin", "Brain"],
                "correct_answer" => "Skin",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 40,
                "category" => "Science",
                "question" => "What is the force that pulls objects toward Earth?",
                "options" => ["Magnetism", "Friction", "Gravity", "Inertia"],
                "correct_answer" => "Gravity",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 41,
                "category" => "Science",
                "question" => "What is the basic unit of life?",
                "options" => ["Atom", "Molecule", "Cell", "Tissue"],
                "correct_answer" => "Cell",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 42,
                "category" => "Science",
                "question" => "What is the fastest land animal?",
                "options" => ["Lion", "Cheetah", "Leopard", "Horse"],
                "correct_answer" => "Cheetah",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 43,
                "category" => "Science",
                "question" => "What is the pH value of pure water?",
                "options" => ["5", "6", "7", "8"],
                "correct_answer" => "7",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 44,
                "category" => "Science",
                "question" => "What is the study of fossils called?",
                "options" => ["Biology", "Geology", "Paleontology", "Archaeology"],
                "correct_answer" => "Paleontology",
                "difficulty" => "hard",
                "points" => 3
            ],
            [
                "id" => 45,
                "category" => "Science",
                "question" => "What is the main component of the Earth's atmosphere?",
                "options" => ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                "correct_answer" => "Nitrogen",
                "difficulty" => "medium",
                "points" => 2
            ],

            // ==================== GENERAL KNOWLEDGE (15 Questions) ====================
            [
                "id" => 46,
                "category" => "General Knowledge",
                "question" => "What is the capital of Japan?",
                "options" => ["Beijing", "Seoul", "Tokyo", "Bangkok"],
                "correct_answer" => "Tokyo",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 47,
                "category" => "General Knowledge",
                "question" => "Who painted the Mona Lisa?",
                "options" => ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"],
                "correct_answer" => "Da Vinci",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 48,
                "category" => "General Knowledge",
                "question" => "What is the longest river in the world?",
                "options" => ["Amazon", "Nile", "Yangtze", "Mississippi"],
                "correct_answer" => "Nile",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 49,
                "category" => "General Knowledge",
                "question" => "Who wrote 'Romeo and Juliet'?",
                "options" => ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
                "correct_answer" => "William Shakespeare",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 50,
                "category" => "General Knowledge",
                "question" => "What is the smallest country in the world?",
                "options" => ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
                "correct_answer" => "Vatican City",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 51,
                "category" => "General Knowledge",
                "question" => "What is the currency of the United Kingdom?",
                "options" => ["Euro", "Dollar", "Pound", "Yen"],
                "correct_answer" => "Pound",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 52,
                "category" => "General Knowledge",
                "question" => "Who invented the telephone?",
                "options" => ["Thomas Edison", "Alexander Bell", "Nikola Tesla", "Albert Einstein"],
                "correct_answer" => "Alexander Bell",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 53,
                "category" => "General Knowledge",
                "question" => "What is the largest ocean on Earth?",
                "options" => ["Atlantic", "Indian", "Arctic", "Pacific"],
                "correct_answer" => "Pacific",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 54,
                "category" => "General Knowledge",
                "question" => "Who was the first person to walk on the moon?",
                "options" => ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
                "correct_answer" => "Neil Armstrong",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 55,
                "category" => "General Knowledge",
                "question" => "What is the national animal of Australia?",
                "options" => ["Koala", "Kangaroo", "Emu", "Platypus"],
                "correct_answer" => "Kangaroo",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 56,
                "category" => "General Knowledge",
                "question" => "What is the tallest mountain in the world?",
                "options" => ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
                "correct_answer" => "Mount Everest",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 57,
                "category" => "General Knowledge",
                "question" => "Who painted the Sistine Chapel ceiling?",
                "options" => ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
                "correct_answer" => "Michelangelo",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 58,
                "category" => "General Knowledge",
                "question" => "What is the official language of Brazil?",
                "options" => ["Spanish", "Portuguese", "English", "French"],
                "correct_answer" => "Portuguese",
                "difficulty" => "easy",
                "points" => 1
            ],
            [
                "id" => 59,
                "category" => "General Knowledge",
                "question" => "Who discovered penicillin?",
                "options" => ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Isaac Newton"],
                "correct_answer" => "Alexander Fleming",
                "difficulty" => "medium",
                "points" => 2
            ],
            [
                "id" => 60,
                "category" => "General Knowledge",
                "question" => "What is the largest desert in the world?",
                "options" => ["Sahara", "Gobi", "Antarctic", "Arabian"],
                "correct_answer" => "Antarctic",
                "difficulty" => "hard",
                "points" => 3
            ],
        ];

        return response()->json($questions);
    }
}