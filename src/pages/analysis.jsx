import Navbar from "../components/navbar";
import Card from "../components/card";

function Analysis() {
  const score = localStorage.getItem("quizScore");

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px",background: "#f4f6f8", minHeight: "100vh" }}>
        <h2>Competency Analysis</h2>
         <Card title="Strength Areas">
          <p>✔ Algebra</p>
          <p>✔ Linear Equations</p>
        </Card>

        <Card title="Weak Areas">
          <p>❌ Statistics</p>
          <p>❌ Probability</p>
        </Card>

        <Card title="AI Recommendation">
          <p>Focus on basic statistics concepts before proceeding.</p>
        </Card>
      </div>
    </>
  );
}

export default Analysis;
