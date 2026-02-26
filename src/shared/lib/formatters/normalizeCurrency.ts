export function normalizeCurrency(currency: string): string {
  if (currency === "$") return "USD";
  if (currency === "₺") return "TRY";
  return currency;
}