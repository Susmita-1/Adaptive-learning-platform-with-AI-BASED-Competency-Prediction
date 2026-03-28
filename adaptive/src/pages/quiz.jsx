import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Timer states
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timeTakenMin, setTimeTakenMin] = useState(0);
  const [timeTakenSec, setTimeTakenSec] = useState(0);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8001/api/questions");
        const data = res.data.questions || res.data.data || res.data;
        setQuestions(data);
        console.log("Questions loaded:", data.length);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load questions. Please check if backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);
  
  // Start timer when quiz begins
  useEffect(() => {
    if (quizStarted) {
      const now = Date.now();
      setStartTime(now);
      setCurrentTime(now);
    }
  }, [quizStarted]);
  
  // Update timer every second
  useEffect(() => {
    let interval;
    if (quizStarted && !submitting) {
      interval = setInterval(() => {
        if (startTime) {
          const now = Date.now();
          setCurrentTime(now);
          const elapsedSeconds = Math.floor((now - startTime) / 1000);
          const minutes = Math.floor(elapsedSeconds / 60);
          const seconds = elapsedSeconds % 60;
          setTimeTakenMin(minutes);
          setTimeTakenSec(seconds);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, startTime, submitting]);
  
  // Handle answer selection
  const handleAnswer = (qId, answer) => {
    setUserAnswers(prev => ({ ...prev, [qId]: answer }));
  };
  
  // Format time display
  const formatTime = () => {
    const minutes = timeTakenMin;
    const seconds = timeTakenSec;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Submit quiz
  const handleSubmit = async () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(userAnswers).length;
    
    console.log("Total questions:", totalQuestions);
    console.log("Answered count:", answeredCount);
    console.log("User answers:", userAnswers);
    console.log("Time taken (minutes):", timeTakenMin);
    console.log("Time taken (seconds):", timeTakenSec);
    
    if (answeredCount < totalQuestions) {
      alert(`Please answer all questions. You've answered ${answeredCount} out of ${totalQuestions} questions.`);
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Calculate time taken (ensure minimum 1 minute for better UX)
      const finalTimeMinutes = Math.max(1, timeTakenMin);
      
      // Get user ID from session storage
      const userId = sessionStorage.getItem("userId");
      
      // Prepare answers with string keys
      const formattedAnswers = {};
      Object.keys(userAnswers).forEach(key => {
        formattedAnswers[key] = userAnswers[key];
      });
      
      console.log("Sending to backend:", {
        answers: formattedAnswers,
        time_taken: finalTimeMinutes,
        user_id: userId
      });
      
      // Send to Laravel backend
      const response = await axios.post("http://127.0.0.1:8001/api/predict", {
        answers: formattedAnswers,
        time_taken: finalTimeMinutes,
        user_id: userId
      });
      
      console.log("Response from backend:", response.data);
      
      if (response.data.success) {
        // Store results in localStorage
        localStorage.setItem("quiz_results", JSON.stringify(response.data));
        
        // Navigate to analysis page
        navigate("/analysis", { 
          state: { 
            results: response.data,
            timeTaken: finalTimeMinutes
          } 
        });
      } else {
        alert("Error calculating results. Please try again.");
      }
      
    } catch (error) {
      console.error("Submit error:", error);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Server Error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        alert("Cannot connect to server. Please check if Laravel is running on port 8001");
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading questions...</h2>
      </div>
    );
  }
  
  if (!quizStarted) {
    return (
      <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <h1>📚 Welcome to the Quiz!</h1>
        <p style={{ fontSize: "18px", margin: "20px 0" }}>
          This quiz contains {questions.length} questions.
        </p>
        <div style={{ textAlign: "left", background: "#f5f5f5", padding: "20px", borderRadius: "10px", margin: "20px 0" }}>
          <h3>Quiz Information:</h3>
          <ul>
            <li>📝 Total Questions: {questions.length}</li>
            <li>⏱️ Timer starts when you begin</li>
            <li>🎯 Each question has one correct answer</li>
            <li>📊 Get detailed analysis after completion</li>
          </ul>
        </div>
        <button 
          onClick={() => setQuizStarted(true)} 
          style={{
            padding: "12px 30px",
            fontSize: "18px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Start Quiz
        </button>
      </div>
    );
  }
  
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Timer and Progress Bar */}
      <div style={{ 
        background: "#f0f0f0", 
        padding: "15px", 
        borderRadius: "10px", 
        marginBottom: "20px",
        position: "sticky",
        top: "0",
        zIndex: 100,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div>
            <span style={{ fontWeight: "bold" }}>📊 Progress:</span> {Object.keys(userAnswers).length} / {questions.length} answered
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>⏱️ Time:</span> {formatTime()}
          </div>
        </div>
        <div style={{ 
          width: "100%", 
          height: "10px", 
          backgroundColor: "#e0e0e0", 
          borderRadius: "5px",
          overflow: "hidden"
        }}>
          <div style={{ 
            width: `${(Object.keys(userAnswers).length / questions.length) * 100}%`, 
            height: "100%", 
            backgroundColor: "#4CAF50",
            transition: "width 0.3s"
          }} />
        </div>
      </div>
      
      {/* Questions */}
      {questions.map((q, index) => (
        <div 
          key={q.id} 
          style={{ 
            marginBottom: "25px", 
            padding: "15px", 
            border: "1px solid #ddd", 
            borderRadius: "10px",
            backgroundColor: userAnswers[q.id] ? "#f9f9f9" : "white"
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>
            {index + 1}. {q.category} - {q.question}
          </h4>
          <div style={{ marginLeft: "20px" }}>
            {q.options.map((opt) => (
              <label 
                key={opt} 
                style={{ 
                  display: "block", 
                  marginTop: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "5px",
                  backgroundColor: userAnswers[q.id] === opt ? "#e3f2fd" : "transparent"
                }}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={userAnswers[q.id] === opt}
                  onChange={() => handleAnswer(q.id, opt)}
                  style={{ marginRight: "10px" }}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      
      {/* Submit Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button 
          onClick={handleSubmit} 
          disabled={submitting || Object.keys(userAnswers).length < questions.length}
          style={{
            padding: "12px 40px",
            fontSize: "18px",
            backgroundColor: (submitting || Object.keys(userAnswers).length < questions.length) ? "#ccc" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: (submitting || Object.keys(userAnswers).length < questions.length) ? "not-allowed" : "pointer"
          }}
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
      
      {/* Warning if not all questions answered */}
      {Object.keys(userAnswers).length < questions.length && (
        <p style={{ textAlign: "center", color: "orange", marginTop: "20px" }}>
          ⚠️ You have answered {Object.keys(userAnswers).length} out of {questions.length} questions.
        </p>
      )}
    </div>
  );
}

export default Quiz;