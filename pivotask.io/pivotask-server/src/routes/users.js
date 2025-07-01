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


export default router;
