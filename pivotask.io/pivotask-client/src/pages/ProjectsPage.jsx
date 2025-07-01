
// src/pages/ProjectsPage.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import { useAppData } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
    const { projects } = useAppData();
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus size={16} />Add Project</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
};
export default ProjectsPage;