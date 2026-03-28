import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";

function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get results from navigation state or localStorage
    const data = location.state?.results || 
                 JSON.parse(localStorage.getItem("quiz_results") || "{}");
    
    console.log("=== ANALYSIS PAGE DATA ===");
    console.log("Full data:", data);
    console.log("Has recommendation:", data.recommendation ? "Yes" : "No");
    console.log("Recommendation:", data.recommendation);
    
    if (data && data.success) {
      setResults(data);
      // Store in localStorage for dashboard
      localStorage.setItem("quiz_results", JSON.stringify(data));
      console.log("Stored in localStorage");
    } else {
      console.log("No valid results found");
    }
    setLoading(false);
  }, [location.state]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Loading your results...</h2>
        </div>
      </>
    );
  }

  if (!results || !results.success) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>No Results Available</h2>
          <p>Please complete the quiz first to see your analysis.</p>
          <button 
            onClick={() => navigate("/quiz")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Take Quiz
          </button>
        </div>
      </>
    );
  }

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}>
        
        {/* Header */}
        <div style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          color: "white", 
          padding: "30px", 
          borderRadius: "10px", 
          marginBottom: "30px",
          textAlign: "center"
        }}>
          <h1>📊 Your Quiz Analysis</h1>
          <p>Here's how you performed on the quiz</p>
        </div>

        {/* Score Overview */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "20px", 
          marginBottom: "30px" 
        }}>
          <Card title="🎯 Total Score">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#2196F3" }}>
                {results.score}/{results.total}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                Correct Answers
              </div>
            </div>
          </Card>
          
          <Card title="📈 Accuracy">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: getPerformanceColor(results.percentage) }}>
                {results.percentage}%
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                Performance
              </div>
            </div>
          </Card>
          
          <Card title="⏱️ Time Taken">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#FF9800" }}>
                {results.time_taken}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                minutes
              </div>
            </div>
          </Card>
        </div>

        {/* Correct and Incorrect Answers */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(2, 1fr)", 
          gap: "20px", 
          marginBottom: "30px" 
        }}>
          <Card title="✅ Correct Answers">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "60px", fontWeight: "bold", color: "#4CAF50" }}>
                {results.correct_count || 0}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                out of {results.total} questions
              </div>
            </div>
          </Card>
          
          <Card title="❌ Incorrect Answers">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "60px", fontWeight: "bold", color: "#F44336" }}>
                {results.wrong_count || 0}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                out of {results.total} questions
              </div>
            </div>
          </Card>
        </div>

        {/* Recommendation Status */}
        <Card title="🤖 AI Recommendation Status">
          {results.recommendation ? (
            <div style={{ color: "green" }}>
              ✅ Recommendation received from FastAPI! Now you can go with dashboard.
              <pre style={{ marginTop: "10px", fontSize: "12px" }}>
                  {/*JSON.stringify(results.recommendation, null, 2) */} 
              </pre>
            </div>
          ) : (
            <div style={{ color: "orange" }}>
              ⚠️ No recommendation received. Check if FastAPI is running on port 8000.
              <br />
              <button 
                onClick={() => window.location.reload()}
                style={{ marginTop: "10px", padding: "5px 10px" }}
              >
                Retry
              </button>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          <button 
            onClick={() => navigate("/quiz")}
            style={{
              padding: "12px 30px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Retake Quiz
          </button>
          
          <button 
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 30px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

export default Analysis;