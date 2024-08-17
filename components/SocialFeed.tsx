"use client";

import { SocialFeedProps } from "@/types";
import { cn } from "@/utils/helpers";
import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import { fetchFeedItems } from "@/utils/api";
import { GoalCard, UserCard } from "@/components";
import { toast } from "react-hot-toast";

const SocialFeed = ({ className }: SocialFeedProps) => {
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { goals } = useStore((state) => ({ goals: state.goals }));

  const fetchFeedData = async () => {
    try {
      const fetchedFeedItems = await fetchFeedItems();
      setFeedItems(fetchedFeedItems);
    } catch (error) {
      console.error("Error fetching feed items:", error);
      toast.error("Failed to load feed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>
      <h2 className="text-xl font-bold mb-4">Activity Feed</h2>

      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading feed...</p>
        </div>
      ) : feedItems.length > 0 ? (
        <div className="space-y-4">
          {feedItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <UserCard user={item.user} className="w-24" />
              <div>
                {item.type === "goal_created" && (
                  <p className="text-gray-600">
                    {item.user.name} created a new goal:{" "}
                    <span className="font-bold">
                      {goals.find((goal) => goal.id === item.goalId)?.title}
                    </span>
                  </p>
                )}
                {item.type === "goal_updated" && (
                  <p className="text-gray-600">
                    {item.user.name} updated their goal:{" "}
                    <span className="font-bold">
                      {goals.find((goal) => goal.id === item.goalId)?.title}
                    </span>
                  </p>
                )}
                {item.type === "goal_completed" && (
                  <p className="text-gray-600">
                    {item.user.name} completed their goal:{" "}
                    <span className="font-bold">
                      {goals.find((goal) => goal.id === item.goalId)?.title}
                    </span>
                  </p>
                )}
                {item.type === "message" && (
                  <p className="text-gray-600">{item.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p>No activity yet.</p>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;