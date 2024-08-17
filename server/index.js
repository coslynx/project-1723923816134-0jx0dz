const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const { API_URL } = require('./config');
const { 
  generateAccessToken, 
  verifyToken 
} = require('./utils/jwt');
const { 
  hashPassword, 
  comparePassword 
} = require('./utils/bcrypt');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Authentication routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateAccessToken({ id: user.id });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to log in user' });
  }
});

// Goal routes
app.post('/api/goals', verifyToken, async (req, res) => {
  try {
    const { title, description, type, target, startDate, endDate } = req.body;
    const userId = req.userId;

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        type,
        target,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
      },
    });

    res.status(201).json({ message: 'Goal created successfully', goal });
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Failed to create goal' });
  }
});

app.get('/api/goals', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ goals });
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
});

app.get('/api/goals/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const goal = await prisma.goal.findUnique({
      where: { id, userId },
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json({ goal });
  } catch (error) {
    console.error('Error fetching goal:', error);
    res.status(500).json({ message: 'Failed to fetch goal' });
  }
});

app.put('/api/goals/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, target, startDate, endDate } = req.body;
    const userId = req.userId;

    const goal = await prisma.goal.update({
      where: { id, userId },
      data: {
        title,
        description,
        type,
        target,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(200).json({ message: 'Goal updated successfully', goal });
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Failed to update goal' });
  }
});

app.delete('/api/goals/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await prisma.goal.delete({
      where: { id, userId },
    });

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Failed to delete goal' });
  }
});

// User routes
app.get('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Social Feed Route
app.get('/api/feed', async (req, res) => {
  try {
    const feedItems = await prisma.goal.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true
          }
        }
      }
    });

    const transformedFeed = feedItems.map((item) => ({
      id: item.id,
      user: item.user,
      type: 'goal_created',
      goalId: item.id
    }));

    res.status(200).json({ feedItems: transformedFeed });
  } catch (error) {
    console.error('Error fetching feed items:', error);
    res.status(500).json({ message: 'Failed to fetch feed items' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;