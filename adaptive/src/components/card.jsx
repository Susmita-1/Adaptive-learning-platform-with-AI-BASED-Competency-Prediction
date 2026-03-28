// components/card.jsx
function Card({ title, children }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px"
    }}>
      <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>{title}</h3>
      {children}
    </div>
  );
}

export default Card;