"use client";

import { GoalCardProps } from "@/types";
import { cn } from "@/utils/helpers";
import { Progress, Button, Tooltip } from "@/components";
import { useStore } from "@/utils/store";
import { useState } from "react";

const GoalCard = ({ goal, onGoalUpdate, className }: GoalCardProps) => {
  const { updateGoal } = useStore((state) => ({
    updateGoal: (updatedGoal) => state.updateGoal(updatedGoal),
  }));
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (updatedGoalData: Partial<Goal>) => {
    try {
      const updatedGoal = { ...goal, ...updatedGoalData };
      await onGoalUpdate(updatedGoal);
      updateGoal(updatedGoal);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-4 flex flex-col items-center",
        className
      )}
    >
      <h3 className="text-lg font-bold mb-2">{goal.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
      <div className="w-full">
        <Progress
          value={goal.progress}
          size="sm"
          className="mb-4"
          color="green"
        />
      </div>
      <Tooltip
        content="Progress is automatically calculated based on your input."
        className="text-gray-600"
        placement="top"
        trigger="hover"
      >
        <span className="ml-2 text-gray-600 text-xs font-semibold">
          {goal.progress}%
        </span>
      </Tooltip>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={handleEdit}
          variant={isEditing ? "secondary" : "primary"}
          disabled={isEditing}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
        {isEditing && (
          <Button onClick={handleSave} variant="primary">
            Save
          </Button>
        )}
      </div>
      {isEditing && (
        <div className="mt-4">
          <GoalForm
            initialValues={goal}
            onSubmit={handleUpdate}
            onClose={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default GoalCard;