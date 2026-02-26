import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export function handleApiError(error: unknown, fallbackMessage = "Something went wrong") {
  // Axios kullanıyorsan:
  const err = error as AxiosError<any>;

  const message =
    err?.response?.data?.message ||
    err?.message ||
    fallbackMessage;

  toast.error(message);
}