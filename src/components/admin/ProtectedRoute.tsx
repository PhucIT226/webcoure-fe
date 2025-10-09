import type { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  children?: ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />;
};
