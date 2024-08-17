"use client";

import { InputProps } from "@/types";
import { cn } from "@/utils/helpers";

const Input = ({
  type = "text",
  id,
  name,
  label,
  value,
  onChange,
  className,
  placeholder,
  required,
  disabled,
  ...props
}: InputProps) => {
  const baseClasses = cn(
    "w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500",
    {
      "ring-red-500": required && !value,
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(baseClasses, className)}
        disabled={disabled}
        {...props}
      />
      {required && !value && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs font-semibold">*</span>
      )}
    </div>
  );
};

export default Input;