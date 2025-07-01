
// src/pages/CalendarPage.jsx
import React, { useState } from 'react';
import { useAppData } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { tasks } = useAppData();
    const navigate = useNavigate();

    const changeMonth = (amount) => setCurrentMonth(prev => addMonths(prev, amount));

    const monthStart = startOfMonth(currentMonth);
    const calendarDays = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(endOfMonth(monthStart)) });

    return (
        <div>
            <div className="flex items-center justify-between mb-6 bg-bg-primary p-4 rounded-lg shadow-sm border"><button onClick={() => changeMonth(-1)} className="p-2 rounded-md hover:bg-bg-secondary"><ChevronLeft /></button><h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2><button onClick={() => changeMonth(1)} className="p-2 rounded-md hover:bg-bg-secondary"><ChevronRight /></button></div>
            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="text-center font-semibold p-2 bg-bg-secondary text-text-muted text-sm">{day}</div>))}{calendarDays.map(day => { const tasksOnDay = tasks.filter(task => isSameDay(new Date(task.dueDate), day)); return (<div key={day.toString()} className={`bg-bg-primary p-2 min-h-[120px] ${!isSameMonth(day, currentMonth) ? 'bg-bg-tertiary opacity-50' : ''}`}><div className={`font-semibold text-right ${isSameDay(day, new Date()) ? 'text-indigo-600' : ''}`}>{format(day, 'd')}</div><div className="space-y-1">{tasksOnDay.map(task => (<div key={task.id} onClick={() => navigate(`/tasks/${task.id}`)} className={`text-xs p-1 rounded cursor-pointer ${task.priority === 'High' ? 'bg-red-200' : 'bg-blue-200'}`}>{task.title}</div>))}</div></div>); })}</div>
        </div>
    );
};
export default CalendarPage;
