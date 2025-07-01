// src/components/ProjectCard.jsx
import React from 'react';
import { useAppData } from '../context/AppContext';

const ProjectCard = ({ project }) => {
    const { tasks } = useAppData();
    const tasksInProject = tasks.filter(t => t.projectId === project.id).length;

    return (
        <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-text-primary">{project.name}</h3>
                <span className={`text-sm font-semibold px-2 py-0.5 ${project.color} rounded-full`}>{project.id}</span>
            </div>
            <p className="text-text-secondary mt-2 mb-4 h-10 overflow-hidden text-ellipsis">{project.description}</p>
            <div className="text-sm text-text-muted">{tasksInProject} tasks</div>
        </div>
    );
};
export default ProjectCard;