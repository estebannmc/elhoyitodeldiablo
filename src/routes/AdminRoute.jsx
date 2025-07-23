import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const { user } = useAuth();
  // Solo el usuario con username 'admin' puede acceder
    if (!user || user.username !== "admin") {
    return <Navigate to="/" replace />;
}
    return children;
}

export default AdminRoute;