import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3>Adaptive Learning</h3>

      <div>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/quiz" style={styles.link}>Quiz</Link>
        <Link to="/analysis" style={styles.link}>Analysis</Link>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#1976d2",
    color: "white"
  },
  link: {
    marginRight: "15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },
  logout: {
    background: "white",
    color: "#1976d2",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};

export default Navbar;
