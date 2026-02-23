import { Navigate, Outlet } from "react-router-dom";

function getToken() {
  return localStorage.getItem("accessToken");
}

export function PublicRoute() {
  const token = getToken();

  if (token) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}