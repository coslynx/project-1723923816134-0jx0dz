"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import { fetchUserGoals } from "@/utils/api";
import GoalCard from "@/components/GoalCard";
import { Button, Progress } from "@/components";
import { toast } from "react-hot-toast";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { goals: storeGoals } = useStore((state) => ({
    goals: state.goals,
  }));

  const fetchUserGoalsData = async () => {
    try {
      const fetchedGoals = await fetchUserGoals(session.user.id);
      setGoals(fetchedGoals);
    } catch (error) {
      console.error("Error fetching user goals:", error);
      toast.error("Failed to load goals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserGoalsData();
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Fitness Dashboard</h1>
      <div className="mb-6">
        <Button href="/goals/create" className="mr-2">
          Create New Goal
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center py-10">
          <Progress value={100} size="sm" />
          <p className="mt-2">Loading goals...</p>
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

export default DashboardPage;