import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
