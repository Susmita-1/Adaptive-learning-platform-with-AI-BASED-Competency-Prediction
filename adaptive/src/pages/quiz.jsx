import Navbar from "../components/navbar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const submitQuiz = () => {
    const score = 60; // simulated score
    sessionStorage.setItem("quizScore", score);
    navigate("/analysis");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", background: "#f4f6f8" }}>
        <Card title="Quiz: Mathematics">
          <p>What is 2 + 2?</p>
          <button>2</button>
          <button>4</button>
          <button>6</button>
          <br /><br />
          <button onClick={submitQuiz}>Submit Quiz</button>
        </Card>
      </div>
    </>
  );
}

export default Quiz;
