"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import { ModalProps } from "@/types";
import {
  Button,
  CloseButton,
  Input,
  Dropdown,
  Progress,
  Tooltip,
} from "@/components";
import { toast } from "react-hot-toast";

const Modal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  initialValues,
}: ModalProps) => {
  const { addGoal, updateGoal } = useStore((state) => ({
    addGoal: (newGoal) => state.addGoal(newGoal),
    updateGoal: (updatedGoal) => state.updateGoal(updatedGoal),
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      toast.success("Goal updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0 sm:pt-0 sm:pb-20`}
      >
        <div
          className={`relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full ${
            isOpen ? "translate-y-0" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="px-6 py-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {title || "Update Goal"}
              </h2>
              <CloseButton onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;