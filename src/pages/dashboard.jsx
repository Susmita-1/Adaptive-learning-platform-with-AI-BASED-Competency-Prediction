import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";


function Dashboard() {
  console.log("Dashboard rendered");

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAuth"); // ✅ clear session
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}>
        <h2>Welcome to Dashboard</h2>
        <Card title="Learning Progress">    
        <p>Current Level: Beginner</p>
          <progress value="65" max="100" style={{ width: "100%" }} />
        </Card>
        <br />
         <Card title="AI Recommendation">
          <p>Next Topic: <b>Probability Basics</b></p>
          <p>Reason: Weak performance in statistics</p>
        </Card>
        <br />
        <button onClick={() => navigate("/quiz")}>
          Start Adaptive Quiz
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Dashboard;
