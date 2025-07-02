import express from 'express';
import cors from 'cors';
import {
    userData,
    groupData,
    projectData,
    taskData,
    serviceTicketData,
    assigneeDetails,
    timesheetData,
    notifications,
    chatMessages
} from './data.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- AUTH ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(userData).find(u => u.email === email);
    if (user && user.password === password) {
        const userToReturn = { ...user };
        delete userToReturn.password;
        res.json(userToReturn);
    } else {
        res.status(401).json({ message: 'Invalid email or password.' });
    }
});

// --- USERS ---
app.get('/api/users', (req, res) => res.json(Object.values(userData)));
app.get('/api/users/:id', (req, res) => res.json(userData[req.params.id]));
app.get('/api/assignee-details', (req, res) => res.json(assigneeDetails));

// --- PROJECTS ---
app.get('/api/projects', (req, res) => res.json(Object.values(projectData)));

// --- TASKS ---
app.get('/api/tasks', (req, res) => res.json(Object.values(taskData)));
app.get('/api/tasks/:id', (req, res) => res.json(taskData[req.params.id]));
app.post('/api/tasks', (req, res) => {
    const task = req.body;
    const newId = 'TKT-' + String(Object.keys(taskData).length + 1).padStart(3, '0');
    task.id = newId;
    task.lastActivity = new Date().toISOString();
    taskData[newId] = task;
    res.status(201).json(task);
});
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    if (taskData[id]) {
        taskData[id] = { ...taskData[id], ...updatedTask, lastActivity: new Date().toISOString() };
        res.json(taskData[id]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});
app.post('/api/tasks/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    if (taskData[id]) {
        if (!taskData[id].comments) {
            taskData[id].comments = [];
        }
        const newComment = { ...comment, timestamp: new Date().toISOString() };
        taskData[id].comments.push(newComment);
        taskData[id].lastActivity = new Date().toISOString();
        res.status(201).json(newComment);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});


// --- SERVICE TICKETS ---
app.get('/api/service-tickets', (req, res) => res.json(Object.values(serviceTicketData)));
app.get('/api/service-tickets/:id', (req, res) => res.json(serviceTicketData[req.params.id]));
// --- TICKETS (alias for service-tickets) ---
app.get('/api/tickets', (req, res) => res.json(Object.values(serviceTicketData)));
app.get('/api/tickets/:id', (req, res) => res.json(serviceTicketData[req.params.id]));

app.put('/api/service-tickets/:id', (req, res) => {
    const { id } = req.params;
    const updatedTicket = req.body;
     if (serviceTicketData[id]) {
        serviceTicketData[id] = { ...serviceTicketData[id], ...updatedTicket };
        res.json(serviceTicketData[id]);
    } else {
        res.status(404).json({ message: 'Service Ticket not found' });
    }
});


// --- TIMESHEETS ---
app.get('/api/timesheets', (req, res) => res.json(timesheetData));
// --- TIMESHEET (singular, for compatibility) ---
app.get('/api/timesheet', (req, res) => res.json(timesheetData));
app.put('/api/timesheet', (req, res) => {
    const newTimesheetData = req.body;
    timesheetData = newTimesheetData;
    res.json(timesheetData);
});
app.put('/api/timesheets', (req, res) => {
    const newTimesheetData = req.body;
    timesheetData = newTimesheetData;
    res.json(timesheetData);
});


// --- NOTIFICATIONS ---
app.get('/api/notifications', (req, res) => res.json(notifications));
app.post('/api/notifications', (req, res) => {
    const { message } = req.body;
    const newNotif = { id: Date.now(), message, read: false, timestamp: new Date() };
    notifications.unshift(newNotif);
    res.status(201).json(newNotif);
});
app.post('/api/notifications/mark-read', (req, res) => {
    notifications.forEach(n => n.read = true);
    res.json(notifications);
});

// --- CHAT ---
app.get('/api/chat', (req, res) => res.json(chatMessages));
app.post('/api/chat', (req, res) => {
    const { userName, text } = req.body;
    const newMessage = {
        userName,
        text,
        timestamp: new Date()
    };
    chatMessages.push(newMessage);
    res.status(201).json(newMessage);
});

// --- ORG CHART ---
app.get('/api/org-chart', (req, res) => {
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

    const root = users.find(user => !user.managerId);
    res.json(tree[root.id]);
});


app.get('/', (req, res) => {
  res.json("Hello from the Node.js server!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
