function Analysis() {
  const score = localStorage.getItem("quizScore");

  let level = "";
  let recommendation = "";

  if (score >= 3) {
    level = "Advanced";
    recommendation = "You can move to advanced topics.";
  } else if (score == 2) {
    level = "Intermediate";
    recommendation = "Revise basics and practice more.";
  } else {
    level = "Beginner";
    recommendation = "Start with fundamental lessons.";
  }


  return (
    <div style={{ padding: "40px" }}>
     <h2>Competency Analysis</h2>
      <p><b>Score:</b> {score}</p>
      <p><b>Level:</b> {level}</p>
      <p><b>AI Recommendation:</b> {recommendation}</p>
    </div>
  );
}

export default Analysis;
