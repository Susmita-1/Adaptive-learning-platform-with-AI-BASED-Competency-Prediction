import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };
  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome to Dashboard</h2>

      <p>Progress: Intermediate</p>
      <p>Recommended Lesson: Probability Basics</p>
      
       <br />
      <button onClick={startQuiz}>Start Quiz</button>

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
