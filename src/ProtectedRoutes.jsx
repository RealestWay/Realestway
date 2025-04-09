// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function ProtectedRoutes({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (!user && !isAuthenticated) {
    return <Navigate to="/SignIn" replace />;
  }

  return children;
}

export default ProtectedRoutes;
