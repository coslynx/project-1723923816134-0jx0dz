"use client";

import { useParams } from "next/navigation";
import { useStore } from "@/utils/store";
import { fetchGoal } from "@/utils/api";
import { useState, useEffect } from "react";
import { GoalCard, ProgressChart } from "@/components";

const ViewGoal = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { goals } = useStore((state) => ({ goals: state.goals }));

  const fetchGoalData = async () => {
    try {
      const fetchedGoal = await fetchGoal(goalId);
      setGoal(fetchedGoal);
    } catch (error) {
      console.error("Error fetching goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalData();
  }, [goalId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading goal...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GoalCard goal={goal} onGoalUpdate={() => {}} />
          <ProgressChart
            title="Progress Towards Goal"
            data={goals
              .filter((g) => g.id === parseInt(goalId))
              .map((g) => ({
                name: "Progress",
                value: g.progress,
              }))}
          />
        </div>
      )}
    </div>
  );
};

export default ViewGoal;