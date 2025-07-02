import { Router } from 'express';
import { userData, assigneeDetails } from '../data.js';

const router = Router();

// GET all users
router.get('/', (req, res) => {
    res.json(Object.values(userData));
});

// GET user details for assignees
router.get('/assignees', (req, res) => {
    res.json(assigneeDetails);
});

// GET org chart data
router.get('/org-chart', (req, res) => {
    const users = Object.values(userData);
    const tree = {};
    const childrenOf = {};

    users.forEach(user => {
        tree[user.id] = { ...user, children: [] };
        childrenOf[user.id] = [];
    });

    users.forEach(user => {
        if (user.managerId && tree[user.managerId]) {
            childrenOf[user.managerId].push(tree[user.id]);
        }
    });

    users.forEach(user => {
        tree[user.id].children = childrenOf[user.id];
    });

    // Find the root (user with no manager)
    const rootNode = Object.values(tree).find(user => !user.managerId);
    
    if (rootNode) {
        res.json(rootNode);
    } else {
        // Handle case with no root or multiple roots if necessary
        res.status(404).json({ message: "Root for org chart not found." });
    }
});
// GET a single user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});
// POST (Create) a new user
router.post('/', (req, res) => {
  const { name, email, role, reportsTo, avatar } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Name, email, and role are required' });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    role,
    // Use a default avatar if none is provided
    avatar: avatar || `https://placehold.co/100x100/E2E8F0/4A5568?text=${name.charAt(0)}`,
    // Ensure reportsTo is stored as a number or null
    reportsTo: reportsTo ? parseInt(reportsTo, 10) : null, 
  };

  users.push(newUser);
  res.status(201).json(newUser);
});


// PUT (Update) a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, reportsTo, avatar } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role,
    avatar: avatar || users[userIndex].avatar,
    reportsTo: reportsTo ? parseInt(reportsTo, 10) : users[userIndex].reportsTo,
  };

  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = users.length;
  users = users.filter(u => u.id !== parseInt(id));

  if (users.length === initialLength) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Optional: Unassign tasks from the deleted user
  tasks = tasks.map(task => {
    if (task.assigneeId === parseInt(id)) {
      return { ...task, assigneeId: null };
    }
    return task;
  });

  res.status(204).send(); // No content
});


export default router;
