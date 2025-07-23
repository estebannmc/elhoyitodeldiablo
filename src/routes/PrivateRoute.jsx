import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { user } = useAuth();
    if (!user) {
    return <Navigate to="/login" replace />;
    }
    return children;
}

export default PrivateRoute;