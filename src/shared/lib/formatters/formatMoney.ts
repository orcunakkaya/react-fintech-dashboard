import { DEFAULT_LOCALE } from "@/shared/config/locale";
import { normalizeCurrency } from "./normalizeCurrency";

type Options = {
  locale?: string;
  currency?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  signDisplay?: "auto" | "always" | "exceptZero" | "never";
};

export function formatMoney(amount: number, opts: Options = {}) {
  const {
    locale = DEFAULT_LOCALE,
    currency = "TRY",
    maximumFractionDigits = 2,
    minimumFractionDigits = 2,
    signDisplay = "auto",
  } = opts;

  const normalized = normalizeCurrency(currency);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: normalized,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits,
    minimumFractionDigits,
    signDisplay,
  }).format(amount);
}