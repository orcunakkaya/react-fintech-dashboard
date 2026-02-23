import { Navigate, Outlet } from "react-router-dom";

function getToken() {
  return localStorage.getItem("accessToken");
}

export function ProtectedRoute() {
  const token = getToken();

  if (!token) return <Navigate to="/auth" replace />;

  return <Outlet />;
}