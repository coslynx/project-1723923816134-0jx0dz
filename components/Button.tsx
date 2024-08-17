"use client";

import { ButtonProps } from "@/types";
import { cn } from "@/utils/helpers";

const Button = ({
  children,
  onClick,
  className,
  variant = "primary",
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300":
        variant === "primary",
      "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-200":
        variant === "secondary",
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300":
        variant === "danger",
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseClasses, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;