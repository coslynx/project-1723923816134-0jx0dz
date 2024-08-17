import axios from 'axios';
import { API_URL } from '@/config/index';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchGoals = async () => {
  try {
    const res = await api.get('/goals');
    return res.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (goalData) => {
  try {
    const res = await api.post('/goals', goalData);
    return res.data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const fetchGoal = async (goalId) => {
  try {
    const res = await api.get(`/goals/${goalId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching goal:', error);
    throw error;
  }
};

export const updateGoal = async (goalId, goalData) => {
  try {
    const res = await api.put(`/goals/${goalId}`, goalData);
    return res.data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const fetchUserGoals = async (userId) => {
  try {
    const res = await api.get(`/users/${userId}/goals`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user goals:', error);
    throw error;
  }
};

export const fetchUser = async (userId) => {
  try {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const res = await api.put(`/users/${userId}`, userData);
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const fetchFeedItems = async () => {
  try {
    const res = await api.get('/feed');
    return res.data;
  } catch (error) {
    console.error('Error fetching feed items:', error);
    throw error;
  }
};

export default api;