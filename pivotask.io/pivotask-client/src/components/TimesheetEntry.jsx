
// src/components/TimesheetEntry.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAppData } from '../context/AppContext';

const TimesheetEntry = ({ entry, dateString, onUpdate, onRemove }) => {
    const { tasks } = useAppData();
    return (
        <div className="grid grid-cols-12 gap-2 items-center">
            <select
                value={entry.ticketId}
                onChange={(e) => onUpdate(entry.id, 'ticketId', e.target.value)}
                className="col-span-8 p-2 border border-border-primary rounded-md bg-bg-primary text-text-secondary"
            >
                <option value="">Select a task...</option>
                {tasks.map(task => <option key={task.id} value={task.id}>{task.id}: {task.title}</option>)}
            </select>
            <input
                type="number"
                step="0.25"
                value={entry.hours}
                onInput={(e) => onUpdate(entry.id, 'hours', e.target.value)}
                className="col-span-3 p-2 border border-border-primary rounded-md bg-bg-primary text-text-secondary"
            />
            <button onClick={() => onRemove(entry.id)} className="col-span-1 text-text-muted hover:text-red-500">
                <Trash2 size={20} className="mx-auto" />
            </button>
        </div>
    );
};
export default TimesheetEntry;