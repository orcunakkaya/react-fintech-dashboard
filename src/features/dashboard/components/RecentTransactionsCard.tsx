import { useMemo, useState } from "react";
import { useRecentTransactions } from "../hooks/useRecentTransactions";
import type { RecentTransaction } from "../types/dashboard.types";
import { formatDate } from "@/shared/lib/formatters/formatDate";
import { formatMoney } from "@/shared/lib/formatters/formatMoney";

type Props = {
  limit?: number;
};

function SkeletonRow() {
  return <div className="h-16 bg-gray-200 animate-pulse rounded-xl" />;
}

export default function RecentTransactionsTable({ limit = 3 }: Props) {
  const { data, isLoading, isError, refetch } = useRecentTransactions();
  const [currentLimit, setCurrentLimit] = useState(limit);

  const transactions = data?.transactions ?? [];
  const visibleTransactions = transactions.slice(0, currentLimit);

  const columns = useMemo(
    () => [
      {
        header: "NAME/BUSINESS",
        align: "left" as const,
        accessor: (t: { name: string; business?: string; image?: string }) => (
          <div className="flex items-center gap-3">
            {t.image && (
              <img src={t.image} alt={t.name} className="object-cover w-10 h-10 rounded " />
            )}
            <div>
              <span className="text-sm font-medium text-[#1B212D]">{t.name}</span>
              {t.business && (
                <p className="mt-0.5 text-xs font-normal text-[#929EAE]">
                  {t.business}
                </p>
              )}
            </div>
          </div>
        ),
      },
      {
        header: "TYPE",
        align: "center" as const,
        accessor: (t: { type: string }) => (
          <span className="text-sm font-medium text-[#929EAE]">{t.type}</span>
        ),
      },
      {
        header: "AMOUNT",
        align: "center" as const,
        accessor: (t: { amount: number; currency: string }) => (
          <span className="text-sm font-semibold text-slate-900">
            {formatMoney(Math.abs(t.amount), { currency: t.currency, maximumFractionDigits: 2 })}
          </span>
        ),
      },
      {
        header: "DATE",
        align: "center" as const,
        accessor: (t: { date: string }) => (
          <span className="text-sm font-medium text-[#929EAE]">
            {formatDate(t.date)}
          </span>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="bg-white p-6 border border-[#F5F5F5] rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B212D]">Recent Transaction</h2>
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
        <h2 className="text-lg font-semibold text-[#1B212D]">Recent Transaction</h2>
        <div className="p-4 mt-4 text-sm text-red-600 border border-dashed rounded-xl">
          Failed to load recent transactions.
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
      className="bg-white py-5 pr-4.75 pl-6.25 sm:p-6 border border-[#F5F5F5] rounded-[10px]"
      aria-labelledby="recent-transactions-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="recent-transactions-heading" className="text-lg font-semibold text-[#1B212D]">
          Recent Transaction
        </h2>

        {transactions.length > limit && (
        <button
            type="button"
            onClick={() => setCurrentLimit(currentLimit === limit ? transactions.length : limit)}
            className="text-xs cursor-pointer font-semibold text-[#29A073] hover:underline shrink-0 focus:outline-none focus:ring-2 focus:ring-[#29A073] focus:ring-offset-2 rounded"
        >
            {currentLimit === limit ? "View All >" : "Show Less"}
        </button>
        )}
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-150" role="table" aria-label="Recent transactions">
          <thead>
            <tr role="row">
              {columns.map((col) => (
                <th
                  key={col.header}
                  role="columnheader"
                  scope="col"
                  className={`px-2 sm:px-4 py-3 text-xs font-semibold text-[#929EAE] ${
                    col.align === "left" ? "text-left" : "text-center"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleTransactions?.length === 0 ? (
              <tr role="row">
                <td
                  colSpan={columns.length}
                  role="cell"
                  className="px-4 py-8 text-sm text-center text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              visibleTransactions?.map((t: RecentTransaction) => (
                <tr key={t.id} role="row" className="border-b border-[#F5F5F5]">
                  {columns.map((col) => (
                    <td
                      key={col.header}
                      role="cell"
                      className={`px-2 sm:px-4 py-4 ${
                        col.align === "left" ? "text-left" : "text-center"
                      }`}
                    >
                      {col.accessor(t)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}