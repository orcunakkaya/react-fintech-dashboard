import { Navigate } from "react-router-dom";

function getToken() {
  return localStorage.getItem("accessToken");
}

export default function RootRedirect() {
  const token = getToken();
  return <Navigate to={token ? "/dashboard" : "/auth"} replace />;
}