import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Card from "../components/card";

function Dashboard() {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load quiz results and recommendation from localStorage
    const results = JSON.parse(localStorage.getItem("quiz_results") || "{}");
    
    console.log("=== DASHBOARD DATA ===");
    console.log("Loaded results:", results);
    console.log("Has recommendation:", results.recommendation ? "Yes" : "No");
    console.log("Recommendation data:", results.recommendation);
    
    if (results && results.success) {
      setQuizResults(results);
      setRecommendation(results.recommendation);
    } else {
      console.log("No valid results found in localStorage");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Loading your dashboard...</h2>
        </div>
      </>
    );
  }

  if (!quizResults || !quizResults.success) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>No Quiz Results Found</h2>
          <p>Please take the quiz first to see your recommendations.</p>
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
          <h1>📊 Your Learning Dashboard</h1>
          <p>Personalized IQ recommendations based on your quiz performance</p>
        </div>

        {/* IQ Recommendation Card */}
        {recommendation ? (
          <Card title={`🤖 AI-Powered IQ Recommendation ${recommendation.icon || '🧠'}`}>
            <div style={{ 
              background: recommendation.color || "#667eea",
              padding: "20px",
              borderRadius: "10px",
              color: "white",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", fontWeight: "bold" }}>
                {recommendation.iq_score}
              </div>
              <div style={{ fontSize: "24px", marginTop: "5px" }}>
                {recommendation.iq_level}
              </div>
              <div style={{ marginTop: "10px", fontSize: "16px" }}>
                {recommendation.competency_level} Level
              </div>
            </div>
            
            <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
              {recommendation.description}
            </p>
          </Card>
        ) : (
          <Card title="⚠️ Recommendation Not Available">
            <p>No recommendation data found. This could be because:</p>
            <ul>
              <li>FastAPI service is not running</li>
              <li>The quiz was taken before FastAPI was set up</li>
              <li>There was an error connecting to FastAPI</li>
            </ul>
            <button 
              onClick={() => navigate("/quiz")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Retake Quiz
            </button>
          </Card>
        )}

        {/* Strengths and Weaknesses */}
        {recommendation && (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(2, 1fr)", 
            gap: "20px", 
            marginBottom: "30px" 
          }}>
            <Card title="💪 Your Strengths">
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {recommendation.strengths?.map((strength, index) => (
                  <li key={index} style={{ marginBottom: "8px", color: "#2e7d32" }}>
                    ✓ {strength}
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card title="📚 Areas for Improvement">
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {recommendation.areas_for_improvement?.map((area, index) => (
                  <li key={index} style={{ marginBottom: "8px", color: "#c62828" }}>
                    ⚠️ {area}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* Personalized Recommendations */}
        {recommendation && recommendation.recommendations?.length > 0 && (
          <Card title="🎯 Personalized Recommendations">
            {recommendation.recommendations.map((rec, index) => (
              <div key={index} style={{ 
                marginBottom: "20px", 
                padding: "15px", 
                backgroundColor: "#f9f9f9", 
                borderRadius: "8px",
                borderLeft: `4px solid ${rec.type === 'challenge' ? '#4CAF50' : rec.type === 'growth' ? '#FF9800' : '#2196F3'}`
              }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{rec.title}</h3>
                <p style={{ margin: "0 0 10px 0", color: "#666" }}>{rec.description}</p>
                <ul style={{ margin: "5px 0 0 0", paddingLeft: "20px" }}>
                  {rec.actions?.map((action, idx) => (
                    <li key={idx} style={{ marginBottom: "5px" }}>{action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        )}

        {/* Learning Path */}
        {recommendation && recommendation.learning_path && (
          <Card title="📈 Your Personalized Learning Path">
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "20px" 
            }}>
              <div style={{ 
                padding: "15px", 
                backgroundColor: "#e8f5e9", 
                borderRadius: "8px"
              }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>Short Term (1-2 weeks)</h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {recommendation.learning_path.short_term?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "5px" }}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ 
                padding: "15px", 
                backgroundColor: "#fff3e0", 
                borderRadius: "8px"
              }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#f57c00" }}>Medium Term (1-3 months)</h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {recommendation.learning_path.medium_term?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "5px" }}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ 
                padding: "15px", 
                backgroundColor: "#e3f2fd", 
                borderRadius: "8px"
              }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#1976d2" }}>Long Term (3-6 months)</h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {recommendation.learning_path.long_term?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "5px" }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Next Steps */}
        {recommendation && recommendation.next_steps?.length > 0 && (
          <Card title="🚀 Immediate Next Steps">
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {recommendation.next_steps.map((step, index) => (
                <li key={index} style={{ marginBottom: "10px", fontSize: "16px" }}>
                  {index + 1}. {step}
                </li>
              ))}
            </ul>
          </Card>
        )}

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
            onClick={() => navigate("/analysis")}
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
            View Detailed Analysis
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;