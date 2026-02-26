import { useScheduledTransfers } from "../hooks/useScheduledTransfers";
import { formatDateTime } from "@/shared/lib/formatters/formatDateTime";
import { formatMoney } from "@/shared/lib/formatters/formatMoney";
import ApiErrorState from "@/shared/ui/ApiErrorState";
import SectionLoading from "@/shared/ui/skeleton/SectionLoading";

export default function ScheduledTransfers() {
  const { data: scheduledTransfers, isLoading, isError, refetch } = useScheduledTransfers();
  const transfers = scheduledTransfers?.transfers ?? [];

  if (isLoading) {
    return <SectionLoading title="Scheduled Transfers" rows={3} />;
  }

  if (isError) {
  return (
    <ApiErrorState
      title="Scheduled Transfers"
      message="Failed to load scheduled transfers."
      onRetry={refetch}
    />
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
                  {`- ${formatMoney(Math.abs(transfer.amount), { currency: transfer.currency, maximumFractionDigits: 2 })}`}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}