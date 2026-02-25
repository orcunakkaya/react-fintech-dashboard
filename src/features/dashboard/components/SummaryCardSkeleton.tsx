export default function SummaryCardSkeleton() {
  return (
    <div className="flex flex-col gap-3.75 p-6 bg-[#F8F8F8] animate-pulse rounded-2xl">
      <div className="w-24 h-2.5 bg-gray-300 rounded" />
      <div className="w-32 h-3.5 bg-gray-300 rounded" />
      <div className="w-16 h-2.5 bg-gray-300 rounded" />
    </div>
  );
}