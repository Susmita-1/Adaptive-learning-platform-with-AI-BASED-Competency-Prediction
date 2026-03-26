import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Safe redirect check
  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]); // ✅ dependency added

  const handleLogin = async () => {
     if (!email || !password) {
  alert("Please enter email and password");
  return;
}
  try {
    const response = await axios.post(
      "http://127.0.0.1:8001/api/login",
      {
        email,
        password,
      }
    );

    // ✅ check response
    if (response.status === 200) {
      sessionStorage.setItem("isAuth", "true");
      navigate("/dashboard", { replace: true });
    }

  } catch (error) {
    console.error(error);
    alert("Invalid credentials");
  }
};

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}>
        <Card>
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

          </p>
        </Card>
      </div>
    </>
  );
}

export default Login;
