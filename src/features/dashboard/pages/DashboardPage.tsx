import DashboardLayout from "@/app/layouts/DashboardLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import SummaryCard from "../components/SummaryCard";
import WorkingCapitalChart from "../components/WorkingCapitalChart";
import RecentTransactionsCard from "../components/RecentTransactionsCard";
import WalletCards from "../components/WalletCards";
import ScheduledTransfers from "../components/ScheduledTransfers";

export default function DashboardPage() {
  const { data: summary, isLoading: isSummaryLoading } = useFinancialSummary();

  return (
    <DashboardLayout>
      <div className="w-full max-w-full grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1fr_minmax(0,400px)]">

        <div className="min-w-0 space-y-4 sm:space-y-6">
        {summary && (
          <article className="grid grid-cols-1 gap-4 lg:grid-cols-3" aria-label="Financial summary">
            <SummaryCard
              title="Total Balance"
              amount={summary.totalBalance.amount}
              currency={summary.totalBalance.currency}
              trend={summary?.totalBalance?.change?.trend}
              theme="dark"
              isLoading={isSummaryLoading}
            />

            <SummaryCard
              title="Total Expense"
              amount={summary.totalExpense.amount}
              currency={summary.totalExpense.currency}
              trend={summary?.totalExpense?.change?.trend}
              theme="light"
              isLoading={isSummaryLoading}
            />

            <SummaryCard
              title="Total Savings"
              amount={summary.totalSavings.amount}
              currency={summary.totalSavings.currency}
              trend={summary.totalSavings.change?.trend}
              theme="light"
              isLoading={isSummaryLoading}
            />
          </article>
        )}
          <WorkingCapitalChart />
          <RecentTransactionsCard />
        </div>

        <aside className="flex flex-col gap-6">
          <WalletCards />
          <ScheduledTransfers />
        </aside>
      </div>
    </DashboardLayout>
  );
}
