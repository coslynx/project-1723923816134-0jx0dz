"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/utils/store";
import { createGoal } from "@/utils/api";
import { GoalForm } from "@/components";
import { toast } from "react-hot-toast";

const CreateGoal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { addGoal } = useStore((state) => ({
    addGoal: (newGoal) => state.addGoal(newGoal),
  }));

  const handleGoalCreate = async (newGoalData) => {
    setIsLoading(true);
    try {
      const newGoal = await createGoal(newGoalData);
      addGoal(newGoal);
      toast.success("Goal created successfully!");
      router.push("/goals");
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <GoalForm onSubmit={handleGoalCreate} onClose={() => router.push("/goals")} />
    </div>
  );
};

export default CreateGoal;