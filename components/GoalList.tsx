"use client";

import { GoalListProps } from "@/types";
import { cn } from "@/utils/helpers";
import { GoalCard } from "@/components";
import { useStore } from "@/utils/store";
import { useState, useEffect } from "react";

const GoalList = ({ className }: GoalListProps) => {
  const { goals } = useStore((state) => ({ goals: state.goals }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>
      <h2 className="text-xl font-bold mb-4">Your Goals</h2>
      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading goals...</p>
        </div>
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="col-span-1 text-center py-10">
          <p>You have no goals yet.</p>
          <p>Click "Create New Goal" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default GoalList;