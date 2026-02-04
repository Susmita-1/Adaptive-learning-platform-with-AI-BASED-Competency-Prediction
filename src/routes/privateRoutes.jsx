import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth")  === "true";

  return isAuth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
