import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // simulate successful login
    localStorage.setItem("isAuth", "true");

    // redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Student Login</h2>

      <input placeholder="Email" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
