import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect if already logged in
  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");

    if (isAuth === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    // ✅ validation
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

      // ✅ SUCCESS LOGIN FLOW (UPDATED 🔥)
      if (response.status === 200) {
        sessionStorage.setItem("isAuth", "true");
        sessionStorage.setItem("quizDone", "false");
        sessionStorage.setItem("analysisDone", "false");

        navigate("/quiz", { replace: true }); // ✅ go to quiz first
      }

    } catch (error) {
      console.error("Login Error:", error.response || error);
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          background: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
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
            {/* optional message */}
          </p>
        </Card>
      </div>
    </>
  );
}

export default Login;