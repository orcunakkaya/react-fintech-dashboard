import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWorkingCapital } from "../hooks/useWorkingCapital";
import expandIcon from "@/assets/dashboard/expand.svg";


export default function WorkingCapitalChart() {

  const { data } = useWorkingCapital();

  const chartData = data?.data.map((item) => ({
    month: item.month,
    income: item.income,
    expense: item.expense,
    net: item.net,
  }))

  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const formatMonthLabel = (month: string) => {
    if (!month) return ''
    try {
      const date = new Date(month)
      if (isNaN(date.getTime())) {
        return month
      }
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${monthNames[date.getMonth()]} ${date.getDate()}`
    } catch {
      return month
    }
  }

  return (
     <section className="bg-white py-5 pr-4.75 pl-6.25  border border-[#F5F5F5] rounded-[10px]" aria-labelledby="working-capital-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="working-capital-heading" className="text-lg font-semibold text-[#1B212D] dark:text-white">Working Capital</h2>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-4 sm:gap-8" role="list" aria-label="Chart legend">
            <div className="flex items-center gap-1.5" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#29A073]" aria-hidden="true"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Income</span>
            </div>
            <div className="flex items-center gap-1.5" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#C8EE44]" aria-hidden="true"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Expenses</span>
            </div>
          </div>
          <div className="bg-[#F8F8F8] rounded-[5px] flex items-center py-1.5 pl-2.5 pr-2 cursor-pointer">
            <span className="text-xs">Last 7 days</span>
            <img src={expandIcon} alt="Expand" className="w-2.25 h-[5.56px] ml-1" />
          </div>
        </div>
      </div>
      <div className="mt-4 h-50 sm:h-62.5">
        {chartData?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-500">No data available.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonthLabel}
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatYAxisTick}
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax']}
              />
              <Tooltip
                labelFormatter={(label) => `Month: ${formatMonthLabel(label)}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#29A073"
                strokeWidth={2}
                dot={false}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#C8EE44"
                strokeWidth={2}
                dot={false}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}