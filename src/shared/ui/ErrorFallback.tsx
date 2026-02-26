import type { FallbackProps } from "react-error-boundary";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return "Unexpected error occurred.";
  }
}

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] p-6">
      <div className="w-full max-w-md p-6 text-center bg-white border shadow-sm rounded-2xl">
        <h2 className="text-lg font-semibold text-[#1B212D]">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-gray-500">{message}</p>

        <div className="flex justify-center gap-3 mt-5">
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="px-4 py-2 rounded-xl bg-[#C8EE44] text-sm font-semibold text-[#1B212D]"
          >
            Try again
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl border text-sm font-semibold text-[#1B212D]"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}