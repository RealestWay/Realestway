import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function ProtectedAuthRoutes({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (user?.role === "user" && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (user?.role === "agent" && isAuthenticated) {
    return <Navigate to="/Profile" replace />;
  }
  return children;
}

export default ProtectedAuthRoutes;
