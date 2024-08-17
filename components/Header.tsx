"use client";

import { HeaderProps } from "@/types";
import { cn } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Dropdown, Input } from "@/components";

const Header = ({ className }: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "bg-white shadow-md py-4 px-4",
        className
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Fitness Goal Tracker
        </Link>
        <div className="flex items-center">
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4 text-gray-700">
                Dashboard
              </Link>
              <Link href="/profile" className="mr-4 text-gray-700">
                Profile
              </Link>
              <Dropdown
                options={[
                  { value: "logout", label: "Logout" },
                ]}
                onChange={(e) => {
                  if (e.target.value === "logout") {
                    session.user.id && session.user.id.toString();
                  }
                }}
              >
                <Button variant="secondary" className="px-4 py-2 rounded-md">
                  {session.user.name}
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4 text-gray-700">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;