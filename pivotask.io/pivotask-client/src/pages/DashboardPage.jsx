
// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useAppData } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { format, startOfWeek, startOfMonth, isToday, isWithinInterval } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardPage = () => {
    const { tasks, timesheet, assigneeDetails } = useAppData();
    const [filter, setFilter] = useState('week');
    const { user } = useAuth();
    const navigate = useNavigate();

    const now = new Date();
    const weekInterval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: now };
    const monthInterval = { start: startOfMonth(now), end: now };

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.lastActivity);
        if (filter === 'today') return isToday(taskDate);
        if (filter === 'week') return isWithinInterval(taskDate, weekInterval);
        if (filter === 'month') return isWithinInterval(taskDate, monthInterval);
        return true;
    });
    
    const myActionItems = tasks.filter(t => t.assignees.includes(user.id) && t.status !== 'Done');
    const inProgressCount = filteredTasks.filter(t => t.status === 'In Progress').length;
    const overdueCount = tasks.filter(t => t.status !== 'Done' && new Date(t.dueDate) < now).length;

    const timeSpent = Object.entries(timesheet).reduce((total, [date, entries]) => {
        const entryDate = new Date(date);
        let shouldInclude = false;
        if (filter === 'today' && isToday(entryDate)) shouldInclude = true;
        if (filter === 'week' && isWithinInterval(entryDate, weekInterval)) shouldInclude = true;
        if (filter === 'month' && isWithinInterval(entryDate, monthInterval)) shouldInclude = true;
        
        if (shouldInclude) {
            return total + entries.reduce((sum, entry) => sum + parseFloat(entry.hours || 0), 0);
        }
        return total;
    }, 0);

    const statusCounts = filteredTasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, { 'To Do': 0, 'In Progress': 0, 'Done': 0 });

    const progressChartData = {
        labels: Object.keys(statusCounts),
        datasets: [{
            label: '# of Tasks',
            data: Object.values(statusCounts),
            backgroundColor: ['#fbbf24', '#f97316', '#16a34a'],
        }],
    };

    const assigneeCounts = filteredTasks.reduce((acc, task) => {
        task.assignees.forEach(assigneeId => {
            const assigneeName = assigneeDetails[assigneeId]?.name || 'Unknown';
            acc[assigneeName] = (acc[assigneeName] || 0) + 1;
        });
        return acc;
    }, {});

    const assigneeChartData = {
        labels: Object.keys(assigneeCounts),
        datasets: [{
            data: Object.values(assigneeCounts),
            backgroundColor: ['#fecaca', '#c7d2fe', '#d1fae5', '#E2E8F0'],
            borderColor: 'var(--bg-primary)',
            borderWidth: 4
        }],
    };

    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } };
    const pieChartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
                <div className="flex items-center gap-1 p-1 bg-bg-secondary border border-border-primary rounded-lg">
                    <button onClick={() => setFilter('today')} className={`px-3 py-1 text-sm rounded-md ${filter === 'today' ? 'bg-indigo-600 text-white' : ''}`}>Today</button>
                    <button onClick={() => setFilter('week')} className={`px-3 py-1 text-sm rounded-md ${filter === 'week' ? 'bg-indigo-600 text-white' : ''}`}>This Week</button>
                    <button onClick={() => setFilter('month')} className={`px-3 py-1 text-sm rounded-md ${filter === 'month' ? 'bg-indigo-600 text-white' : ''}`}>This Month</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary"><p className="text-sm text-text-muted">My Action Items</p><p className="text-3xl font-bold">{myActionItems.length}</p></div>
                <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary"><p className="text-sm text-text-muted">Time This {filter}</p><p className="text-3xl font-bold">{timeSpent.toFixed(2)} hrs</p></div>
                <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary"><p className="text-sm text-text-muted">Tasks In Progress</p><p className="text-3xl font-bold">{inProgressCount}</p></div>
                <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary"><p className="text-sm text-text-muted">Overdue Tasks</p><p className="text-3xl font-bold text-red-500">{overdueCount}</p></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary">
                        <h3 className="font-semibold mb-4">My Tasks</h3>
                        <div className="space-y-3">
                            {myActionItems.slice(0, 5).map(task => (
                                <div key={task.id} onClick={() => navigate(`/tasks/${task.id}`)} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border border-border-primary hover:border-indigo-400 cursor-pointer">
                                    <p className="font-medium text-text-secondary">{task.title}</p>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{task.priority}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary"><h3 className="font-semibold mb-4">Tasks Progress</h3><div className="h-64"><Bar options={chartOptions} data={progressChartData} /></div></div>
                </div>
                <div className="space-y-6">
                    <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary">
                        <h3 className="font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {filteredTasks.slice(0, 5).map(task => (
                                <div key={task.id} className="flex items-start gap-3 text-sm">
                                    <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                    <div><p className="text-text-secondary"><span className="font-semibold text-text-primary">{task.id}</span> was updated</p><p className="text-xs text-text-muted">{format(new Date(task.lastActivity), 'PP')}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary"><h3 className="font-semibold mb-4">Tasks by Assignee</h3><div className="h-64 flex justify-center"><Pie data={assigneeChartData} options={pieChartOptions} /></div></div>
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;