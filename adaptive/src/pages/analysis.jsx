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

  // Extract data from results
  const { 
    score = 0, 
    total = 0, 
    percentage = 0, 
    weighted_percentage = 0,
    time_taken = 0,
    correct_count = 0,
    wrong_count = 0,
    category_performance = {},
    difficulty_performance = {},
    correct_answers = [],
    wrong_answers = [],
    recommendation = null
  } = results;

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Excellent! 🎉";
    if (percentage >= 80) return "Great Job! 👍";
    if (percentage >= 70) return "Good Work! 📚";
    if (percentage >= 60) return "Fair! 💪";
    return "Keep Practicing! 📖";
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
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "20px", 
          marginBottom: "30px" 
        }}>
          <Card title="🎯 Total Score">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#2196F3" }}>
                {score}/{total}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                Correct Answers
              </div>
            </div>
          </Card>
          
          <Card title="📈 Accuracy">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: getPerformanceColor(percentage) }}>
                {percentage}%
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                {getPerformanceMessage(percentage)}
              </div>
            </div>
          </Card>

          <Card title="⚡ Weighted Score">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#9C27B0" }}>
                {weighted_percentage || percentage}%
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                Difficulty-adjusted
              </div>
            </div>
          </Card>
          
          <Card title="⏱️ Time Taken">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#FF9800" }}>
                {time_taken}
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
                {correct_count || 0}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                out of {total} questions
              </div>
            </div>
          </Card>
          
          <Card title="❌ Incorrect Answers">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "60px", fontWeight: "bold", color: "#F44336" }}>
                {wrong_count || 0}
              </div>
              <div style={{ color: "#666", marginTop: "5px" }}>
                out of {total} questions
              </div>
            </div>
          </Card>
        </div>

        {/* Performance by Difficulty */}
        {difficulty_performance && Object.keys(difficulty_performance).length > 0 && (
          <Card title="🎯 Performance by Difficulty">
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "20px" 
            }}>
              {Object.entries(difficulty_performance).map(([difficulty, data]) => (
                <div key={difficulty} style={{ 
                  textAlign: "center", 
                  padding: "20px", 
                  background: "#f5f5f5", 
                  borderRadius: "10px",
                  borderTop: `4px solid ${
                    difficulty === 'easy' ? '#4CAF50' : 
                    difficulty === 'medium' ? '#FF9800' : '#F44336'
                  }`
                }}>
                  <div style={{ 
                    fontSize: "20px", 
                    fontWeight: "bold", 
                    marginBottom: "10px",
                    color: difficulty === 'easy' ? '#4CAF50' : 
                           difficulty === 'medium' ? '#FF9800' : '#F44336'
                  }}>
                    {difficulty.toUpperCase()}
                  </div>
                  <div style={{ 
                    fontSize: "36px", 
                    fontWeight: "bold", 
                    color: getPerformanceColor(data.percentage || 0)
                  }}>
                    {data.percentage || 0}%
                  </div>
                  <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                    {data.correct || 0}/{data.total || 0} correct
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Category Performance */}
        {category_performance && Object.keys(category_performance).length > 0 && (
          <Card title="📊 Performance by Category">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Category</th>
                  <th style={{ padding: "12px", textAlign: "center" }}>Score</th>
                  <th style={{ padding: "12px", textAlign: "center" }}>Accuracy</th>
                  <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                 </tr>
              </thead>
              <tbody>
                {Object.entries(category_performance).map(([category, data]) => (
                  <tr key={category} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>{category}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      {data.correct}/{data.total}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: data.percentage >= 80 ? "#e8f5e9" : 
                                       data.percentage >= 60 ? "#fff3e0" : "#ffebee",
                        color: data.percentage >= 80 ? "#2e7d32" : 
                               data.percentage >= 60 ? "#f57c00" : "#c62828"
                      }}>
                        {data.percentage}%
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      {data.percentage >= 80 ? "✅ Strong" : 
                       data.percentage >= 60 ? "⚠️ Average" : "❌ Needs Work"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* Recommendation Status */}
        <Card title="🤖 AI Recommendation Status">
          {recommendation ? (
            <div style={{ color: "green" }}>
              ✅ Recommendation received from FastAPI!
              <pre style={{ marginTop: "10px", fontSize: "12px", background: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
                {/*{JSON.stringify(recommendation, null, 2)} */}
              </pre>
            </div>
          ) : (
            <div style={{ color: "orange" }}>
              ⚠️ No recommendation received. Check if FastAPI is running on port 8000.
            </div>
          )}
        </Card>

        {/* Wrong Answers - Detailed Review */}
        {wrong_answers && wrong_answers.length > 0 && (
          <Card title={`📝 Questions to Review (${wrong_answers.length} questions)`}>
            {wrong_answers.map((wrong, index) => (
              <div key={index} style={{ 
                marginBottom: "20px", 
                padding: "15px", 
                backgroundColor: "#ffebee", 
                borderRadius: "8px",
                borderLeft: "4px solid #f44336"
              }}>
                <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
                  {index + 1}. {wrong.question}
                </p>
                <p style={{ margin: "5px 0", color: "#d32f2f" }}>
                  ❌ Your answer: {wrong.user_answer || "Not answered"}
                </p>
                <p style={{ margin: "5px 0", color: "#388e3c" }}>
                  ✓ Correct answer: {wrong.correct_answer}
                </p>
                {wrong.difficulty && (
                  <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
                    Difficulty: {wrong.difficulty} | Points: {wrong.points}
                  </p>
                )}
              </div>
            ))}
          </Card>
        )}

        {/* Correct Answers - Summary */}
        {correct_answers && correct_answers.length > 0 && (
          <Card title={`✅ Questions You Got Right (${correct_answers.length} questions)`}>
            <details>
              <summary style={{ cursor: "pointer", color: "#4CAF50", fontWeight: "bold", padding: "10px" }}>
                Click to view all correct answers
              </summary>
              <div style={{ marginTop: "15px" }}>
                {correct_answers.map((correct, index) => (
                  <div key={index} style={{ 
                    padding: "10px", 
                    marginBottom: "10px", 
                    backgroundColor: "#e8f5e9", 
                    borderRadius: "5px"
                  }}>
                    <p style={{ margin: 0 }}>
                      <strong>{index + 1}.</strong> {correct.question}
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#2e7d32" }}>
                      ✓ Your answer: {correct.user_answer}
                    </p>
                    {correct.difficulty && (
                      <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
                        Difficulty: {correct.difficulty} | Points: {correct.points}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </details>
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