"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import { fetchGoals, createGoal } from "@/utils/api";
import GoalCard from "@/components/GoalCard";
import GoalForm from "@/components/GoalForm";
import { Button, Input, Modal, Progress, Dropdown, Tooltip } from "@/components";

const GoalsPage = () => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addGoal, updateGoal } = useStore((state) => ({
    addGoal: (newGoal) => state.addGoal(newGoal),
    updateGoal: (updatedGoal) => state.updateGoal(updatedGoal),
  }));

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleGoalCreate = async (newGoalData) => {
    try {
      const newGoal = await createGoal(newGoalData);
      setGoals([...goals, newGoal]);
      addGoal(newGoal);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const handleGoalUpdate = async (updatedGoal) => {
    try {
      const updatedGoals = goals.map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      );
      setGoals(updatedGoals);
      updateGoal(updatedGoal);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const fetchAndStoreGoals = async () => {
    try {
      const fetchedGoals = await fetchGoals();
      setGoals(fetchedGoals);
      fetchedGoals.forEach(addGoal);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAndStoreGoals();
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Fitness Goals</h1>

      <div className="mb-6">
        <Button onClick={handleOpenModal} className="mr-2">
          Create New Goal
        </Button>
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <GoalForm
            onSubmit={handleGoalCreate}
            onClose={handleCloseModal}
          />
        </Modal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-1 text-center py-10">
            <Progress value={100} size="sm" />
            <p className="mt-2">Loading goals...</p>
          </div>
        ) : goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onGoalUpdate={handleGoalUpdate}
            />
          ))
        ) : (
          <div className="col-span-1 text-center py-10">
            <p>You have no goals yet.</p>
            <p>Click "Create New Goal" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;