export function formatDateTime(iso: string, locale = "tr-TR") {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}