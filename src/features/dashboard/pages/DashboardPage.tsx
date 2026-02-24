import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* LEFT BLOCK */}
        <section className="flex flex-col gap-6">
          {/* Summary cards (only inside left block) */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-40 p-6 bg-white border rounded-2xl">Summary 1</div>
            <div className="h-40 p-6 bg-white border rounded-2xl">Summary 2</div>
            <div className="h-40 p-6 bg-white border rounded-2xl">Summary 3</div>
          </div>

          {/* Working Capital */}
          <div className="p-6 bg-white border h-80 rounded-2xl">
            Working Capital Chart
          </div>

          {/* Recent Transactions */}
          <div className="p-6 bg-white border h-80 rounded-2xl">
            Recent Transactions
          </div>
        </section>

        {/* RIGHT BLOCK */}
        <aside className="flex flex-col gap-6">
          <div className="h-56 p-6 bg-white border rounded-2xl">My Wallet</div>
          <div className="h-56 p-6 bg-white border rounded-2xl">
            Scheduled Transfers
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}