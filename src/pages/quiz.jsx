import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Quiz() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    let newScore = score;
    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
    }

    // save score and go to analysis
    localStorage.setItem("quizScore", newScore);
    navigate("/analysis");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Quiz</h2>
      <p>What is 2 + 2?</p>

      <button onClick={() => handleAnswer(false)}>2</button>
      <button onClick={() => handleAnswer(true)}>4</button>
      <button onClick={() => handleAnswer(false)}>6</button>
    </div>
  );
}

export default Quiz;
