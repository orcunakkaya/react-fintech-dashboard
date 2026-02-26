import { useWalletCards } from "../hooks/useWalletCards";
import visaIcon from "@/assets/dashboard/visa.svg";
import mastercardIcon from "@/assets/dashboard/mastercard.svg";
import walletChipIcon from "@/assets/dashboard/walletChip.svg";
import walletWifiIcon from "@/assets/dashboard/walletWifi.svg";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 ${className}`} />;
}

export default function WalletCards() {
  const { data, isLoading, isError, refetch } = useWalletCards();

  const cards = data?.cards ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1B212D]">Wallet</h2>
        <div className="relative h-80.5">
          <Skeleton className="absolute left-0 top-0 h-52.5 w-full max-w-88.5 rounded-2xl" />
          <Skeleton className="absolute left-3.75 top-37.5 h-43 w-full max-w-81 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-white border rounded-2xl border-slate-200">
        <p className="text-sm text-red-600">Failed to load wallet cards.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 text-xs font-semibold text-[#29A073] hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isError) {
  throw new Error("Failed to load working capital");
}

  if (cards.length === 0) {
    return (
      <div className="flex h-80.5 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-sm text-slate-500">No wallet cards available.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4" aria-labelledby="wallet-heading">
      <h2 id="wallet-heading" className="text-lg font-semibold text-[#1B212D]">
        Wallet
      </h2>

      <div className="relative h-80.5 w-full overflow-hidden lg:grid lg:place-items-center">
        {cards.map((card, index) => {
          const isFirst = index === 0;

          const expiryDate = `${String(card.expiryMonth).padStart(2, "0")}/${String(
            card.expiryYear
          ).slice(-2)}`;

          const maskedCardNumber = isFirst
            ? card.cardNumber
            : `${card.cardNumber.slice(0, 8)}****`;

          return (
            <article
              key={card.id}
              className={`absolute rounded-2xl p-4 sm:p-6 text-white ${
                isFirst
                  ? "left-0 top-0 z-0 w-full max-w-88.5 h-52.5 bg-linear-to-br from-[#4A4A49] to-[#20201F]"
                  : "left-3.75 top-37.5 z-10 w-[calc(100%-15px)] max-w-81 h-43 bg-linear-to-b from-white/40 to-black/10 backdrop-blur-[10px]"
              }`}
              aria-label={`${card.bank} card ending in ${card.cardNumber.slice(-4)}`}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-start justify-between">
                  <p className="text-base font-normal text-white">
                    Fintech.{" "}
                    <span
                      className={`text-base font-normal ml-0.5 ${
                        isFirst ? "text-[#626260]" : "text-white"
                      }`}
                    >
                      |
                    </span>{" "}
                    <span
                      className={`text-xs font-medium ml-0.5 ${
                        isFirst ? "text-[#626260]" : "text-white"
                      }`}
                    >
                      {card.bank}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 mb-1.75 ">
                  <img
                    src={walletChipIcon}
                    alt="Card chip"
                    className={`${isFirst ? "h-8 w-10" : "h-6 w-8"} ${
                      !isFirst ? "opacity-50" : ""
                    }`}
                  />
                  <img
                    src={walletWifiIcon}
                    alt="Contactless payment icon"
                    className={`h-8.5 w-7.75 ${isFirst ? "opacity-50" : ""}`}
                  />
                </div>

                <div className="mt-auto">
                  <p
                    className={`text-[17px] font-bold tracking-widest ${
                      isFirst ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {maskedCardNumber}
                  </p>

                  <div className="flex items-end justify-between">
                    <p
                      className={`text-sm font-medium ${
                        isFirst ? "text-white" : "text-slate-600"
                      }`}
                    >
                      {expiryDate}
                    </p>

                    {isFirst ? (
                      <img
                        src={mastercardIcon}
                        alt="Mastercard"
                        className="object-contain w-10 h-10"
                      />
                    ) : (
                      <img
                        src={visaIcon}
                        alt="Visa"
                        className="object-contain w-10 h-6"
                      />
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}