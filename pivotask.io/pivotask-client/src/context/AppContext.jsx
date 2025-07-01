import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../api/api.js'; // Fixed path
import { useAuth } from './AuthContext';
const defaultAppContext = {
    tasks: [],
    projects: [],
    users: [],
    assigneeDetails: {},
    serviceTickets: [],
    timesheet: {},
    notifications: [],
    fetchData: () => {},
    setTasks: () => {},
    setServiceTickets: () => {},
    setTimesheet: () => {},
    setNotifications: () => {},
};
const AppContext = createContext(defaultAppContext);

export const AppProvider = ({ children }) => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [assigneeDetails, setAssigneeDetails] = useState({});
    const [serviceTickets, setServiceTickets] = useState([]);
    const [timesheet, setTimesheet] = useState({});
    const [notifications, setNotifications] = useState([]);

    const fetchData = async () => {
        if (!user) return; // Don't fetch if not logged in
        try {
            const [
                tasksRes,
                projectsRes,
                usersRes,
                assigneesRes,
                ticketsRes,
                timesheetRes,
                notificationsRes
            ] = await Promise.all([
                api.getTasks(),
                api.getProjects(),
                api.getUsers(),
                api.getAssigneeDetails(),
                api.getServiceTickets(),
                api.getTimesheet(),
                api.getNotifications()
            ]);
            setTasks(tasksRes.data);
            setProjects(projectsRes.data);
            setUsers(usersRes.data);
            setAssigneeDetails(assigneesRes.data);
            setServiceTickets(ticketsRes.data);
            setTimesheet(timesheetRes.data);
            setNotifications(notificationsRes.data);
        } catch (error) {
            console.error("Failed to fetch initial app data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]); // Re-fetch data when user logs in

    const value = {
        tasks,
        projects,
        users,
        assigneeDetails,
        serviceTickets,
        timesheet,
        notifications,
        fetchData, // Allow components to refetch all data
        setTasks,
        setServiceTickets,
        setTimesheet,
        setNotifications,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = () => useContext(AppContext);
