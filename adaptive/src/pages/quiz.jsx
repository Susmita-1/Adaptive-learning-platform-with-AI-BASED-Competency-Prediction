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
  const [startTime, setStartTime] = useState(null);

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
      setStartTime(Date.now());
    }
  }, [quizStarted]);
  
  // Handle answer selection
  const handleAnswer = (qId, answer) => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev, [qId]: answer };
      console.log("Current answers:", newAnswers);
      return newAnswers;
    });
  };
  
  // Submit quiz
  const handleSubmit = async () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(userAnswers).length;
    
    console.log("Total questions:", totalQuestions);
    console.log("Answered count:", answeredCount);
    console.log("User answers:", userAnswers);
    
    if (answeredCount < totalQuestions) {
      alert(`Please answer all questions. You've answered ${answeredCount} out of ${totalQuestions} questions.`);
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Calculate time taken
      const endTime = Date.now();
      const timeTakenSec = startTime ? Math.round((endTime - startTime) / 1000) : 0;
      const timeTakenMin = Math.max(1, Math.round(timeTakenSec / 60));
      
      // Prepare answers with string keys
      const formattedAnswers = {};
      Object.keys(userAnswers).forEach(key => {
        formattedAnswers[key] = userAnswers[key];
      });
      
      console.log("Sending to backend:", {
        answers: formattedAnswers,
        time_taken: timeTakenMin
      });
      
      // Send to Laravel backend
      const response = await axios.post("http://127.0.0.1:8001/api/predict", {
        answers: formattedAnswers,
        time_taken: timeTakenMin
      });
      
      console.log("Response from backend:", response.data);
      
      if (response.data.success) {
        console.log("Correct count:", response.data.correct_count);
        console.log("Wrong count:", response.data.wrong_count);
        console.log("Wrong answers:", response.data.wrong_answers);
        
        // Store results in localStorage
        localStorage.setItem("quiz_results", JSON.stringify(response.data));
        
        // Navigate to analysis page with data
        navigate("/analysis", { 
          state: { 
            results: response.data 
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
      {/* Progress Bar */}
      <div style={{ 
        background: "#f0f0f0", 
        padding: "10px", 
        borderRadius: "5px", 
        marginBottom: "20px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <span>Progress: {Object.keys(userAnswers).length} / {questions.length} answered</span>
          <span>Time: {startTime ? Math.round((Date.now() - startTime) / 1000 / 60) : 0} minutes</span>
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
            backgroundColor: "#4CAF50"
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
            borderRadius: "10px"
          }}
        >
          <h4>{index + 1}. {q.category} - {q.question}</h4>
          <div style={{ marginLeft: "20px" }}>
            {q.options.map((opt) => (
              <label key={opt} style={{ display: "block", marginTop: "8px", cursor: "pointer" }}>
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
          disabled={submitting}
          style={{
            padding: "12px 40px",
            fontSize: "18px",
            backgroundColor: submitting ? "#ccc" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: submitting ? "not-allowed" : "pointer"
          }}
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;