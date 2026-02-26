import { DEFAULT_LOCALE } from "@/shared/config/locale";

export function formatDateTime(iso: string, locale = DEFAULT_LOCALE) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}