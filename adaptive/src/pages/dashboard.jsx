import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ added loading state

  const handlePredict = async () => {
    try {
      setLoading(true); // ✅ start loading

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          score: 80,
          accuracy: 75,
          time_taken: 10
        }
      );

      setResult(response.data.predicted_level);

    } catch (error) {
      console.error("Error calling ML API:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      <button onClick={handlePredict}>
        {loading ? "Predicting..." : "Predict My Level"}
      </button>

      {/* ✅ Spinner inside return */}
      {loading && <LoadingSpinner />}

      {result && !loading && (
        <h3 style={{ marginTop: "20px" }}>
          Predicted Level: {result}
        </h3>
      )}
    </div>
  );
}

export default Dashboard;
