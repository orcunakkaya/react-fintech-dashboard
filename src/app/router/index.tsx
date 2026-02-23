import { createBrowserRouter } from "react-router-dom";
import RootRedirect from "./RootRedirect";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

import AuthPage from "@/features/auth/pages/AuthPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

export const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  {
    element: <PublicRoute />,
    children: [{ path: "/auth", element: <AuthPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/dashboard", element: <DashboardPage /> }],
  },
  { path: "*", element: <AuthPage /> },
]);