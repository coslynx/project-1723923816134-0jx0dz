"use client";

import { useParams } from "next/navigation";
import { useStore } from "@/utils/store";
import { fetchGoal, updateGoal } from "@/utils/api";
import { useState, useEffect } from "react";
import { GoalForm, ProgressChart } from "@/components";
import { toast } from "react-hot-toast";

const EditGoal = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { updateGoal: updateGoalStore } = useStore((state) => ({
    updateGoal: (updatedGoal) => state.updateGoal(updatedGoal),
  }));

  const fetchGoalData = async () => {
    try {
      const fetchedGoal = await fetchGoal(goalId);
      setGoal(fetchedGoal);
    } catch (error) {
      console.error("Error fetching goal:", error);
      toast.error("Failed to load goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoalUpdate = async (updatedGoalData) => {
    try {
      const updatedGoal = await updateGoal(goalId, updatedGoalData);
      setGoal(updatedGoal);
      updateGoalStore(updatedGoal);
      toast.success("Goal updated successfully!");
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal. Please try again.");
    }
  };

  useEffect(() => {
    if (goalId) {
      fetchGoalData();
    }
  }, [goalId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading goal...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GoalForm
            initialValues={goal}
            onSubmit={handleGoalUpdate}
            onClose={() => {}}
          />
          <ProgressChart
            title="Progress Towards Goal"
            data={[
              {
                name: "Progress",
                value: goal.progress,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default EditGoal;