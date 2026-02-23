import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { queryClient } from "@/shared/lib/queryClient";

import "react-toastify/dist/ReactToastify.css";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer position="top-right" autoClose={2500} />
    </QueryClientProvider>
  );
}