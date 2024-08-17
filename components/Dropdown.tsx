"use client";

import { useState, useEffect } from "react";
import { DropdownProps } from "@/types";
import { Tooltip } from "@/components";

const Dropdown = ({
  id,
  name,
  value,
  onChange,
  className,
  options,
  required,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || options[0].value);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange && onChange(event);
  };

  useEffect(() => {
    setSelectedValue(value || options[0].value);
  }, [value, options]);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 ${
          required && "ring-red-500"
        }`}
        onClick={handleOpen}
      >
        {options.find((option) => option.value === selectedValue)?.label ||
          "Select"}
        <svg
          className="ml-2 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant={selectedValue}
        >
          <ul className="py-2 overflow-auto text-gray-700">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleChange({ target: { value: option.value } })}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {required && (
        <Tooltip content="This field is required" placement="top" trigger="hover">
          <span className="ml-2 text-red-500 text-xs font-semibold">*</span>
        </Tooltip>
      )}
    </div>
  );
};

export default Dropdown;