import { Router } from 'express';
import { taskData } from '../data.js';

const router = Router();

// GET all tasks
router.get('/', (req, res) => {
    res.json(Object.values(taskData));
});

// GET a single task by ID
router.get('/:id', (req, res) => {
    const task = taskData[req.params.id];
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST a new task
router.post('/', (req, res) => {
    const task = req.body;
    const newId = 'TKT-' + String(Object.keys(taskData).length + 1).padStart(3, '0');
    const newTask = {
        ...task,
        id: newId,
        lastActivity: new Date().toISOString(),
        comments: [],
        attachments: [],
    };
    taskData[newId] = newTask;
    res.status(201).json(newTask);
});

// PUT (update) a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (taskData[id]) {
        taskData[id] = { ...taskData[id], ...updatedData, lastActivity: new Date().toISOString() };
        res.json(taskData[id]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST a comment to a task
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    if (taskData[id]) {
        const newComment = { ...comment, timestamp: new Date().toISOString() };
        taskData[id].comments.push(newComment);
        taskData[id].lastActivity = new Date().toISOString();
        res.status(201).json(newComment);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

export default router;
