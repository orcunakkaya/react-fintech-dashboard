import { toast } from "react-toastify";
import { errorHandler } from "@/shared/lib/errorHandler";

export function handleApiError(
  error: unknown,
  fallbackMessage = "Something went wrong"
): string {
  const message = errorHandler(error, { fallbackMessage });
  toast.error(message);
  return message;
}
