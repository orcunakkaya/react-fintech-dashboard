type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-slate-200/80 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent skeleton-shimmer" />
    </div>
  );
}
