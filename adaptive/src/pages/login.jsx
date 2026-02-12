import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
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

  const handleLogin = () => {
    if (email === "student@gmail.com" && password === "1234") {
      sessionStorage.setItem("isAuth", "true");
      navigate("/dashboard", { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>  
    <Navbar />
    <div style={{ padding: "40px" ,background: "#f4f6f8", minHeight: "100vh"}}>
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
        (Use: student@gmail.com / 1234)
      </p>
      </Card>
    </div>
      </>
  );
}

export default Login;
