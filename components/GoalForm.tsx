"use client";

import { useState } from "react";
import { GoalFormProps, Goal } from "@/types";
import { cn } from "@/utils/helpers";
import { Input, Button, Dropdown, Progress, Tooltip } from "@/components";
import { toast } from "react-hot-toast";

const GoalForm = ({
  onSubmit,
  onClose,
  initialValues,
}: GoalFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Goal>(
    initialValues || {
      title: "",
      description: "",
      type: "weight_loss",
      target: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      ).toISOString().slice(0, 10),
      progress: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? parseInt(e.target.value, 10)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      toast.success("Goal created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          Title
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          Description
        </label>
        <Input
          type="text"
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          Type
        </label>
        <Dropdown
          id="type"
          name="type"
          value={formData.type || "weight_loss"}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          options={[
            { value: "weight_loss", label: "Weight Loss" },
            { value: "muscle_gain", label: "Muscle Gain" },
            { value: "distance_running", label: "Distance Running" },
            { value: "other", label: "Other" },
          ]}
          required
        />
      </div>
      <div>
        <label
          htmlFor="target"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          Target
        </label>
        <Input
          type="number"
          id="target"
          name="target"
          value={formData.target || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="startDate"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          Start Date
        </label>
        <Input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          End Date
        </label>
        <Input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="progress"
          className="block mb-1 text-gray-700 text-sm font-bold"
        >
          Progress
        </label>
        <Progress
          value={formData.progress || 0}
          size="sm"
          className="w-full"
        />
        <Tooltip
          content="Progress is automatically calculated based on your input."
          className="text-gray-600"
          placement="top"
          trigger="hover"
        >
          <span className="ml-2 text-gray-600 text-xs font-semibold">
            {formData.progress || 0}%
          </span>
        </Tooltip>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading} className="mr-2">
          {isLoading ? "Saving..." : "Save Goal"}
        </Button>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;