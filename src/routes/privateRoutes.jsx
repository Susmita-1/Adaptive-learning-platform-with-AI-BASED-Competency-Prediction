import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem("isAuth");

  if (isAuth === "true") {
    return children; // ✅ MUST return children directly
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
