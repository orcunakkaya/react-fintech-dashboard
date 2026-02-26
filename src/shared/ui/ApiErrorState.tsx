type ApiErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export default function ApiErrorState({
  title,
  message = "Something went wrong while loading data.",
  onRetry,
  className = "bg-white p-6 border border-[#F5F5F5] rounded-[10px]",
}: ApiErrorStateProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-lg font-semibold text-[#1B212D]">{title}</h2>
      )}

      <div className="p-4 mt-4 text-sm text-red-600 border border-dashed rounded-xl">
        {message}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="ml-2 text-xs font-semibold text-[#29A073] hover:underline"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
