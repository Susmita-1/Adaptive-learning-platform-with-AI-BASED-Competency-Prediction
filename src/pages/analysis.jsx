function Analysis() {
  const score = localStorage.getItem("quizScore");

  let level = "Beginner";
  let recommendation = "Revise basics";

  if (score >= 1) {
    level = "Intermediate";
    recommendation = "Proceed to next topic";
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Competency Analysis</h2>

      <p>Score: {score}</p>
      <p>Predicted Level: {level}</p>
      <p>Recommendation: {recommendation}</p>
    </div>
  );
}

export default Analysis;
