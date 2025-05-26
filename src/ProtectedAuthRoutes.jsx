import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function ProtectedAuthRoutes({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (user && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAuthRoutes;
