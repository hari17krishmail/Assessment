import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // return isAuth ? children : <Navigate to="/" />;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token"); 
  return isAuth || token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;