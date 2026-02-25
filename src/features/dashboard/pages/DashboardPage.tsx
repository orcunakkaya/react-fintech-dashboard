import DashboardLayout from "@/app/layouts/DashboardLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import SummaryCard from "../components/SummaryCard";
import SummaryCardSkeleton from "../components/SummaryCardSkeleton.tsx";
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

        
        {isSummaryLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCardSkeleton />
            <SummaryCardSkeleton/>
            <SummaryCardSkeleton />
          </div>
        )}
      
        {summary && (
          <article className="grid grid-cols-1 gap-4 lg:grid-cols-3" aria-label="Financial summary">
            <SummaryCard
              title="Total Balance"
              amount={summary.totalBalance.amount}
              currency={summary.totalBalance.currency}
              trend={summary?.totalBalance?.change?.trend}
              theme="dark"
            />

            <SummaryCard
              title="Total Expense"
              amount={summary.totalExpense.amount}
              currency={summary.totalExpense.currency}
              trend={summary?.totalExpense?.change?.trend}
              theme="light"
            />

            <SummaryCard
              title="Total Savings"
              amount={summary.totalSavings.amount}
              currency={summary.totalSavings.currency}
              trend={summary.totalSavings.change?.trend}
              theme="light"
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
