import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;