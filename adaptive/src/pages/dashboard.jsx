import axios from "axios";
import { useState } from "react";

function Dashboard() {
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
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
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      <button onClick={handlePredict}>
        Predict My Level
      </button>

      {result && (
        <h3 style={{ marginTop: "20px" }}>
          Predicted Level: {result}
        </h3>
      )}
    </div>
  );
}

export default Dashboard;
