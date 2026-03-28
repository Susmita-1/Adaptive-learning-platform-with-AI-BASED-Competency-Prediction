import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/register",
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword
        }
      );
      
      if (response.data.success) {
        alert("Registration successful! Please login.");
        navigate("/");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        alert("Please check the form for errors");
      } else if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
                <span style={{ fontSize: "40px" }}>📝</span>
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
                Create Account
              </h2>
              <p style={{ color: "#666", margin: 0 }}>
                Join our learning community
              </p>
            </div>

            <form onSubmit={handleRegister}>
              {/* Name Input */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 15px 12px 45px",
                      fontSize: "16px",
                      border: `2px solid ${errors.name ? "#f44336" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
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
                    👤
                  </span>
                </div>
                {errors.name && (
                  <p style={{ color: "#f44336", fontSize: "12px", marginTop: "5px" }}>
                    {errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 15px 12px 45px",
                      fontSize: "16px",
                      border: `2px solid ${errors.email ? "#f44336" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
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
                {errors.email && (
                  <p style={{ color: "#f44336", fontSize: "12px", marginTop: "5px" }}>
                    {errors.email[0]}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 15px 12px 45px",
                      fontSize: "16px",
                      border: `2px solid ${errors.password ? "#f44336" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
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
                    }}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <p style={{ color: "#f44336", fontSize: "12px", marginTop: "5px" }}>
                    {errors.password[0]}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div style={{ marginBottom: "25px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    ✓
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  marginBottom: "20px",
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Login Link */}
              <div style={{ textAlign: "center" }}>
                <p style={{ margin: 0, color: "#666" }}>
                  Already have an account?{" "}
                  <Link
                    to="/"
                    style={{
                      color: "#667eea",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Register;