import { DEFAULT_LOCALE } from "@/shared/config/locale";

export function formatDate(iso: string, locale = DEFAULT_LOCALE) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}