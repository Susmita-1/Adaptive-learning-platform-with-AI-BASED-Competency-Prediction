import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome to Dashboard</h2>
      <p>Current Level: Beginner</p>
      <br />
      <button onClick={() => navigate("/quiz")}>
        Start Adaptive Quiz
      </button>
        <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
