import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is 2 + 2?",
    options: ["2", "4", "6"],
    answer: "4",
  },
  {
    question: "Which is a programming language?",
    options: ["HTML", "Java", "Photoshop"],
    answer: "Java",
  },
  {
    question: "React is a ____ library.",
    options: ["Backend", "Database", "Frontend"],
    answer: "Frontend",
  },
];

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // quiz finished
      localStorage.setItem("quizScore", score + 1);
      navigate("/analysis");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Adaptive Quiz</h2>
      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h3>{questions[currentQuestion].question}</h3>

      {questions[currentQuestion].options.map((option) => (
        <div key={option}>
          <button
            style={{ margin: "5px" }}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
