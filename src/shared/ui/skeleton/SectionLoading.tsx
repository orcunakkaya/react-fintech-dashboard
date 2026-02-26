import Skeleton from "./Skeleton";

type SectionLoadingProps = {
  title?: string;
  rows?: number;
  cardMode?: boolean;
};

export default function SectionLoading({
  title,
  rows = 3,
  cardMode = false,
}: SectionLoadingProps) {
  if (cardMode) {
    return (
      <div className="space-y-4 ">
        {title && <h2 className="text-lg font-semibold text-[#1B212D]">{title}</h2>}
        <div className="relative w-full h-80.5">
          <Skeleton className="absolute left-0 top-0 z-0 h-52.5 w-full max-w-88.5 rounded-2xl" />
          <Skeleton className="absolute left-3.75 top-37.5 h-43 z-10 w-[calc(100%-15px)] max-w-81 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border border-[#F5F5F5] rounded-[10px]">
      {title && <h2 className="text-lg font-semibold text-[#1B212D]">{title}</h2>}
      <div className="mt-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="relative h-16 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
