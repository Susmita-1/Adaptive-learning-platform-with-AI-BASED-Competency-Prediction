function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  }
};

export default Card;
