import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If a role is required and user doesn't have it, redirect to home
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, user can access route
  return children;
};

export default ProtectedRoute;