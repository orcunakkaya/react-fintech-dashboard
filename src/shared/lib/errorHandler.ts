import axios, { type AxiosError } from "axios";

const DEFAULT_ERROR_MESSAGE = "Something went wrong";

type ApiErrorPayload = {
  message?: unknown;
  error?: unknown;
};

type ErrorHandlerOptions = {
  fallbackMessage?: string;
  log?: boolean;
};

function getMessageFromPayload(payload?: ApiErrorPayload): string | null {
  if (!payload) return null;

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  return null;
}

function getAxiosErrorMessage(error: AxiosError<ApiErrorPayload>): string {
  const payloadMessage = getMessageFromPayload(error.response?.data);
  if (payloadMessage) return payloadMessage;

  if (typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }

  if (error.response?.status) {
    return `Request failed (${error.response.status})`;
  }

  return "Network error";
}

export function getErrorMessage(
  error: unknown,
  fallbackMessage = DEFAULT_ERROR_MESSAGE
): string {
  if (axios.isAxiosError(error)) return getAxiosErrorMessage(error);

  if (error instanceof Error && error.message.trim()) return error.message;

  if (typeof error === "string" && error.trim()) return error;

  return fallbackMessage;
}

export function errorHandler(
  error: unknown,
  options: ErrorHandlerOptions = {}
): string {
  const { fallbackMessage = DEFAULT_ERROR_MESSAGE, log = false } = options;
  const message = getErrorMessage(error, fallbackMessage);

  if (log) {
    console.error("Handled error:", error);
  }

  return message;
}
