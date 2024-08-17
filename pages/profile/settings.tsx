"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import { fetchUser, updateUser } from "@/utils/api";
import { Button, Input, Modal, Progress } from "@/components";
import { toast } from "react-hot-toast";

const ProfileSettings = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { updateUser: updateUserStore } = useStore((state) => ({
    updateUser: (updatedUser) => state.updateUser(updatedUser),
  }));

  const fetchUserData = async () => {
    try {
      const fetchedUser = await fetchUser(session.user.id);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserUpdate = async (updatedUserData) => {
    try {
      const updatedUser = await updateUser(session.user.id, updatedUserData);
      setUser(updatedUser);
      updateUserStore(updatedUser);
      toast.success("User settings updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user settings. Please try again.");
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading user settings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={user.name}
                  readOnly
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <Button onClick={() => setShowUpdateModal(true)}>
              Update Settings
            </Button>
            <Modal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedUserData = {
                      name: e.target.name.value,
                      email: e.target.email.value,
                    };
                    handleUserUpdate(updatedUserData);
                  }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-1">
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        defaultValue={user.name}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Notifications</h2>
            <div className="mb-4">
              {/* Add notification settings here */}
            </div>
            <h2 className="text-2xl font-bold mb-2">Privacy</h2>
            <div>
              {/* Add privacy settings here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;