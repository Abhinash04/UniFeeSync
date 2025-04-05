
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Protected = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "superadmin") {
      return <Navigate to="/superadmin/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default Protected;