import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  isLoading,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={clsx(
        "h-12 w-full rounded-xl font-semibold transition",
        "bg-[#C8EE44] hover:bg-[#B0E23D] text-[#1B212D]",
        "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}