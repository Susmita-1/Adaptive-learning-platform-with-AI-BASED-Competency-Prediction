import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (email === "student@gmail.com" && password === "1234") {
      localStorage.setItem("isAuth", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Student Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: "10px", color: "gray" }}>
        (Use: student@gmail.com / 1234)
      </p>
    </div>
  );
}

export default Login;
