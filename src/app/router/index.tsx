import { createBrowserRouter } from "react-router-dom";
import RootRedirect from "./RootRedirect";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

import AuthPage from "@/features/auth/pages/AuthPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import TransactionsPage from "@/features/dashboard/pages/TransactionsPage";
import InvoicesPage from "@/features/dashboard/pages/InvoicesPage";
import MyWalletsPage from "@/features/dashboard/pages/MyWalletsPage";
import SettingsPage from "@/features/dashboard/pages/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  {
    element: <PublicRoute />,
    children: [{ path: "/auth", element: <AuthPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/transactions", element: <TransactionsPage /> },
    { path: "/invoices", element: <InvoicesPage /> },
    { path: "/wallets", element: <MyWalletsPage /> },
    { path: "/settings", element: <SettingsPage /> },
  ],
  },
  { path: "*", element: <AuthPage /> },
]);