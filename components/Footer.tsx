"use client";

import { FooterProps } from "@/types";
import { cn } from "@/utils/helpers";

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "bg-gray-900 text-white py-4 mt-16",
        className
      )}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2023 Fitness Goal Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;