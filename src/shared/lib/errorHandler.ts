import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: unknown } | undefined;

    // API çoğunlukla { message: "..."} veya { success:false, message:"..." } döner
    if (data?.message && typeof data.message === "string") return data.message;

    return error.response?.status
      ? `Request failed (${error.response.status})`
      : "Network error";
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong";
}