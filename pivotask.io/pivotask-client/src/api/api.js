import axios from 'axios';

// The base URL for all API requests. This points to your backend server.
const API_URL = 'http://localhost:3001/api';

// Create an instance of axios with the base URL pre-configured.
// This means you don't have to type the full URL for every request.
const api = axios.create({
    baseURL: API_URL,
});

// --- AUTH ---
// Function to handle user login. It sends a POST request with email and password.
export const login = (credentials) => api.post('/login', credentials);

// --- USERS ---
// Gets a list of all users.
export const getUsers = () => api.get('/users');
// Gets a simplified list of users for populating assignee dropdowns, etc.
export const getAssigneeDetails = () => api.get('/users/assignees');
// Gets the hierarchical data for building the organizational chart.
export const getOrgChart = () => api.get('/users/org-chart');

// --- PROJECTS ---
// Gets a list of all projects.
export const getProjects = () => api.get('/projects');

// --- TASKS ---
// Gets a list of all tasks.
export const getTasks = () => api.get('/tasks');
// Gets the details for a single task by its ID.
export const getTask = (id) => api.get(`/tasks/${id}`);
// Creates a new task. The task data is sent in the request body.
export const createTask = (task) => api.post('/tasks', task);
// Updates an existing task by its ID. The updated data is sent in the request body.
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
// Adds a comment to a specific task.
export const addTaskComment = (taskId, comment) => api.post(`/tasks/${taskId}/comments`, comment);

// --- SERVICE TICKETS ---
// Gets a list of all service tickets.
export const getServiceTickets = () => api.get('/tickets');
// Gets the details for a single service ticket by its ID.
export const getServiceTicket = (id) => api.get(`/tickets/${id}`);
// Updates an existing service ticket by its ID.
export const updateServiceTicket = (id, ticket) => api.put(`/tickets/${id}`, ticket);

// --- TIMESHEETS ---
// Gets the entire timesheet data object.
export const getTimesheet = () => api.get('/timesheet');
// Updates the timesheet data. Sends the entire updated object.
export const updateTimesheet = (data) => api.put('/timesheet', data);

// --- NOTIFICATIONS ---
// Gets a list of all notifications for the current user.
export const getNotifications = () => api.get('/notifications');
// Creates a new notification.
export const createNotification = (message) => api.post('/notifications', { message });
// Marks all notifications as read.
export const markNotificationsRead = () => api.post('/notifications/read');

// --- CHAT ---
// Gets all chat messages.
export const getChatMessages = () => api.get('/chat');
// Sends a new chat message.
export const sendChatMessage = (message) => api.post('/chat', message);

// Default export of the configured axios instance, in case it's needed directly.
export default api;
