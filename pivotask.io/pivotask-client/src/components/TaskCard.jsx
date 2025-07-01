
// src/components/TaskCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppContext';

const TaskCard = ({ task }) => {
    const navigate = useNavigate();
    const { assigneeDetails } = useAppData();

    const priorityClasses = {
        High: 'bg-red-100 text-red-700',
        Medium: 'bg-orange-100 text-orange-700',
        Low: 'bg-yellow-100 text-yellow-700',
    };

    return (
        <div
            onClick={() => navigate(`/tasks/${task.id}`)}
            data-task-id={task.id}
            className="p-4 bg-bg-secondary rounded-lg border border-border-primary cursor-grab hover:border-indigo-400"
        >
            <p className={`font-medium text-text-primary ${task.status === 'Done' ? 'line-through text-text-muted' : ''}`}>
                {task.title}
            </p>
            <div className="flex items-center justify-between mt-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityClasses[task.priority]}`}>
                    {task.priority}
                </span>
                <div className="flex -space-x-2 overflow-hidden">
                    {task.assignees.map(id => assigneeDetails[id] && (
                        <img key={id} src={assigneeDetails[id].avatar} alt={assigneeDetails[id].name} title={assigneeDetails[id].name} className="inline-block h-6 w-6 rounded-full ring-2 ring-bg-primary" />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default TaskCard;