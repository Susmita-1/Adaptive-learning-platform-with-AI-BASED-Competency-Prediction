import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";  // ← Add Link import
import Navbar from "../components/navbar";
import Card from "../components/card";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/login",
        { email, password }
      );
      
      if (response.status === 200 && response.data.success) {
        // Store user data
        sessionStorage.setItem("isAuth", "true");
        sessionStorage.setItem("userId", response.data.user.id);
        sessionStorage.setItem("userName", response.data.user.name);
        sessionStorage.setItem("userEmail", response.data.user.email);
        sessionStorage.setItem("userLevel", response.data.user.current_level);
        sessionStorage.setItem("quizDone", "false");
        sessionStorage.setItem("analysisDone", "false");
        
        navigate("/quiz", { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "40px 20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "450px", margin: "0 auto" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <span style={{ fontSize: "40px" }}>🎓</span>
              </div>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "28px",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome Back!
              </h2>
              <p style={{ color: "#666", margin: 0 }}>
                Sign in to continue your learning journey
              </p>
            </div>

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      width: "100%",
                      padding: "12px 15px 12px 45px",
                      fontSize: "16px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "10px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "18px",
                    }}
                  >
                    📧
                  </span>
                </div>
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      width: "100%",
                      padding: "12px 15px 12px 45px",
                      fontSize: "16px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "10px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "18px",
                    }}
                  >
                    🔒
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      padding: "5px",
                    }}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: loading
                    ? "#ccc"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  marginBottom: "20px",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "18px",
                        height: "18px",
                        border: "2px solid white",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                        marginRight: "8px",
                      }}
                    />
                    Logging in...
                  </span>
                ) : (
                  "Login to Your Account"
                )}
              </button>

              {/* Register Link - Moved outside the form */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <p style={{ margin: 0, color: "#666" }}>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#667eea",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>

            {/* Demo Credentials */}
            <div
              style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #e0e0e0",
                marginTop: "20px",
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
                📝 Demo Credentials
              </p>
              <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                <strong>Email:</strong> student@example.com
              </p>
              <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                <strong>Password:</strong> password123
              </p>
            </div>

            {/* Additional Links */}
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#764ba2")}
                onMouseLeave={(e) => (e.target.style.color = "#667eea")}
              >
                Forgot Password?
              </a>
              <a
                href="#"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#764ba2")}
                onMouseLeave={(e) => (e.target.style.color = "#667eea")}
              >
                Create New Account
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Add CSS animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}

export default Login;