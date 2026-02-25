import { useScheduledTransfers } from "../hooks/useScheduledTransfers";

function SkeletonRow() {
  return <div className="h-16 bg-gray-200 animate-pulse rounded-xl" />;
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatAmount(amount: number, currency: string) {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency === "$" ? "USD" : currency, // API bazen "$" yolluyor
    maximumFractionDigits: 2,
  }).format(abs);
  return `- ${formatted}`;
}

export default function ScheduledTransfers() {
  const { data: scheduledTransfers, isLoading, isError, refetch } = useScheduledTransfers();
  const transfers = scheduledTransfers?.transfers ?? [];
  if (isLoading) {
    return (
      <div className="bg-white p-6 border border-[#F5F5F5] rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B212D]">
            Scheduled Transfers
          </h2>
        </div>
        <div className="space-y-3">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white p-6 border border-[#F5F5F5] rounded-[10px]">
        <h2 className="text-lg font-semibold text-[#1B212D]">
          Scheduled Transfers
        </h2>
        <div className="p-4 mt-4 text-sm text-red-600 border border-dashed rounded-xl">
          Failed to load scheduled transfers.
          <button
            type="button"
            onClick={() => refetch()}
            className="ml-2 text-xs font-semibold text-[#29A073] hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      className="p-4 bg-white sm:p-6"
      aria-labelledby="scheduled-transfers-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          id="scheduled-transfers-heading"
          className="text-lg font-semibold text-[#1B212D]"
        >
          Scheduled Transfers
        </h2>

        <button
          type="button"
          className="text-xs font-semibold text-[#29A073] hover:underline shrink-0 focus:outline-none focus:ring-2 focus:ring-[#29A073] focus:ring-offset-2 rounded"
          aria-label="View all scheduled transfers"
        >
          View All &gt;
        </button>
      </div>

      <div className="space-y-3">
        {transfers.length === 0 ? (
          <p className="py-4 text-sm text-center text-slate-500">
            No scheduled transfers.
          </p>
        ) : (
          transfers.map((transfer) => (
            <div
              key={transfer.id}
              className="flex items-center justify-between gap-3 py-2 rounded-lg"
            >
              <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-3">
                {transfer.image ? (
                  <img
                    src={transfer.image}
                    alt={transfer.name}
                    className="rounded-full object-cover shrink-0 w-8.25 h-8.25"
                  />
                ) : (
                  <div className="rounded-full bg-slate-200 flex items-center justify-center shrink-0 w-8.25 h-8.25">
                    <span className="text-xs font-semibold text-slate-600">
                      {transfer.name
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1B212D]">
                    {transfer.name}
                  </p>
                  <p className="mt-1 truncate text-xs font-medium text-[#929EAE]">
                    {formatDateTime(transfer.date)}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-base font-semibold text-black">
                  {formatAmount(transfer.amount, transfer.currency)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}