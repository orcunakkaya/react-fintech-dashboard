import walletIcon from "@/assets/dashboard/summary/wallet-add.svg";
import walletActiveIcon from "@/assets/dashboard/summary/wallet-add-active.svg";
import walletNegIcon from "@/assets/dashboard/summary/wallet-neg.svg";
import walletNegActiveIcon from "@/assets/dashboard/summary/wallet-neg-active.svg";
import { formatMoney } from "@/shared/lib/formatters/formatMoney";
import Skeleton from "@/shared/ui/skeleton/Skeleton";

type Props = {
  title: string;
  amount: number;
  currency: string;
  trend?: "up" | "down";
  theme: "light" | "dark";
  isLoading: boolean
};

export default function SummaryCard({
  title,
  amount,
  currency,
  trend,
  theme,
  isLoading
}: Props) {
  const isPositive = trend === "up";
 
  const iconSrc = isPositive
    ? theme === "light"
      ? walletIcon
      : walletActiveIcon
    : theme === "light"
    ? walletNegIcon
    : walletNegActiveIcon;

    if (isLoading) {
        return (
          <div className="flex flex-col gap-3.75 p-6 bg-[#F8F8F8] animate-pulse rounded-2xl">
            <Skeleton className="relative w-1/2 h-2.5" />
            <Skeleton className="relative w-full h-2.5" />
          </div>
        );
      }

  return ( 
    <>
     <article aria-label={title} className={`rounded-2xl p-4 sm:p-6 ${theme === "light" ? "bg-[#F8F8F8]" : "bg-[#363A3F]"}`} aria-labelledby={title}>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className={`relative rounded-full p-2 ${theme === "light" ? "bg-[#EDEDED]" : "bg-[#4E5257]"}`}>
              <img src={iconSrc} alt={`${title} icon`} className="w-5 h-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p id="total-balance" className="text-sm font-medium text-[#929EAE]">{title}</p>
            <p className={`mt-2 text-xl font-bold lg:text-2xl truncate ${theme === "light" ? "text-[#1B212D]" : "text-white"}`}>
              {formatMoney(amount, { currency, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}