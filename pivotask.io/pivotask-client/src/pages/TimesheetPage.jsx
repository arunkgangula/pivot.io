
// src/pages/TimesheetPage.jsx
import React, { useState } from 'react';
import { useAppData } from '../context/AppContext';
import * as api from '../api/api.js';
import { format, startOfWeek, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import TimesheetEntry from '../components/TimesheetEntry';

const TimesheetPage = () => {
    const { timesheet, setTimesheet } = useAppData();
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const handleWeekChange = (amount) => setCurrentWeekStart(prev => addDays(prev, 7 * amount));

    const handleUpdate = (dateString, entryId, field, value) => {
        const updated = JSON.parse(JSON.stringify(timesheet));
        const entry = updated[dateString]?.find(e => e.id === entryId);
        if (entry) {
            entry[field] = value;
            setTimesheet(updated);
        }
    };

    const handleAdd = (dateString) => {
        const updated = JSON.parse(JSON.stringify(timesheet));
        if (!updated[dateString]) updated[dateString] = [];
        updated[dateString].push({ id: Date.now(), ticketId: '', hours: 0 });
        setTimesheet(updated);
    };

    const handleRemove = (dateString, entryId) => {
        const updated = JSON.parse(JSON.stringify(timesheet));
        updated[dateString] = updated[dateString].filter(e => e.id !== entryId);
        setTimesheet(updated);
    };

    const handleSubmit = async () => {
        await api.updateTimesheet(timesheet);
        alert('Timesheet submitted!');
    };

    const weekDates = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));
    const weeklyTotal = weekDates.reduce((total, date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        return total + (timesheet[dateString] || []).reduce((sum, entry) => sum + parseFloat(entry.hours || 0), 0);
    }, 0);

    return (
        <div>
            <div className="flex items-center justify-between mb-6"><h1 className="text-3xl font-bold">Timesheet</h1><div className="flex items-center gap-2"><button onClick={() => handleWeekChange(-1)} className="p-2 rounded-md hover:bg-bg-secondary"><ChevronLeft /></button><span className="font-semibold">{format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}</span><button onClick={() => handleWeekChange(1)} className="p-2 rounded-md hover:bg-bg-secondary"><ChevronRight /></button></div></div>
            <div className="bg-bg-primary p-6 rounded-lg shadow-sm border"><div className="space-y-6">{weekDates.map(date => { const dateString = format(date, 'yyyy-MM-dd'); const entries = timesheet[dateString] || []; const dailyTotal = entries.reduce((s, e) => s + parseFloat(e.hours || 0), 0); return (<div key={dateString} className="p-4 rounded-lg bg-bg-secondary border"><div className="flex justify-between items-center mb-4"><div><h3 className="font-bold text-lg">{format(date, 'eeee')}</h3><p className="text-sm text-text-muted">{format(date, 'MMMM d')}</p></div><div className="text-right"><p className="font-bold text-lg">{dailyTotal.toFixed(2)} hrs</p></div></div><div className="space-y-2">{entries.map(entry => <TimesheetEntry key={entry.id} entry={entry} dateString={dateString} onUpdate={handleUpdate} onRemove={handleRemove} />)}</div><button onClick={() => handleAdd(dateString)} className="mt-4 text-indigo-600 font-medium text-sm flex items-center gap-2"><Plus size={16} />Add Entry</button></div>); })}</div><div className="mt-6 p-4 border-t-2 border-indigo-500 flex justify-end items-center gap-4"><p className="text-sm font-semibold text-text-muted">WEEKLY TOTAL</p><p className="text-2xl font-bold text-indigo-600">{weeklyTotal.toFixed(2)} hours</p></div><div className="flex justify-end mt-4"><button onClick={handleSubmit} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold">Submit Timesheet</button></div></div>
        </div>
    );
};
export default TimesheetPage;
