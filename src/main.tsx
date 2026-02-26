import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProviders } from "./app/providers/AppProviders";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/shared/ui/ErrorFallback";
import { errorHandler } from "@/shared/lib/errorHandler";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        errorHandler(error, { log: true });
        console.error("Global error caught:", error, info);
      }}
    >
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>
)
