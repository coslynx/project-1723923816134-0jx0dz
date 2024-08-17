"use client";

import { UserCardProps } from "@/types";
import { cn } from "@/utils/helpers";

const UserCard = ({ user, className }: UserCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center",
        className
      )}
    >
      <img
        src={user.imageUrl}
        alt={`${user.name} profile picture`}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{user.name}</h3>
      <p className="text-gray-500 text-sm">{user.email}</p>
    </div>
  );
};

export default UserCard;