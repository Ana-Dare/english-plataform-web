import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth/AuthContext";
import type { UserRole } from "../contexts/Auth/AuthContext";

interface RoleProtectedRoutesProps {
  allowedRoles: UserRole[];
}

const RoleProtectedRoutes = ({ allowedRoles }: RoleProtectedRoutesProps) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    // Redirecionar para o dashboard correspondente ao role
    if (role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }
    if (role === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    }
    if (role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    
    // Se role não reconhecido, voltar para login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoutes;
