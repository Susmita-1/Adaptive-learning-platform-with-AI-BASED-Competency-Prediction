import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";

function Quiz() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    let newScore = score;
    if (isCorrect) 
      newScore += 1;
      setScore(newScore);
    

     // After 3 questions, go to analysis
       if (newScore >= 0) {
    localStorage.setItem("quizScore", newScore);
    navigate("/analysis");
    }
  };

  return (
     <>
      <Navbar />
    <div style={{ padding: "40px",background: "#f4f6f8", minHeight: "100vh" }}>
       <Card title="Quiz: Mathematics">  
      <h2>Quiz</h2>
      <p>What is 2 + 2?</p>
      <button onClick={() => handleAnswer(false)}>2</button>
      <button onClick={() => handleAnswer(true)}>4</button>
      <button onClick={() => handleAnswer(false)}>6</button>
       </Card>
    </div>
     </>
  );
}
const styles = {
  btn: {
    marginRight: "10px",
    padding: "8px 15px",
    cursor: "pointer"
  }
};

export default Quiz;
