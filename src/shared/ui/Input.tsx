import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="grid">
      {/* Label */}
      <label
        htmlFor={inputId}
        className="text-sm p-2.5 pl-0 font-medium leading-none text-gray-900"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={inputId}
        className={clsx(
          "h-12 w-full border",
          "rounded-[10px]",
          "pl-5 pr-6.25 pt-3.75 pb-4",
          "text-sm font-medium",
          "text-[#78778B]",
          "outline-none transition",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400",
          props.disabled && "bg-gray-100 cursor-not-allowed",
          className
        )}
        {...props}
      />

      {/* Error */}
      {error && (
        <p className="mt-1.5 text-xs leading-none text-red-600">{error}</p>
      )}
    </div>
  );
}