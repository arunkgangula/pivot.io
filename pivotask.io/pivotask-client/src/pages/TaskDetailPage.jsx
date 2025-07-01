
// src/pages/TaskDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../api/api.js';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppContext';
import { ChevronLeft, Paperclip } from 'lucide-react';

const TaskDetailPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [comment, setComment] = useState('');
    const { user } = useAuth();
    const { tasks, assigneeDetails } = useAppData();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await api.getTask(taskId);
                setTask(data);
            } catch (error) {
                console.error("Failed to fetch task details", error);
            }
        };
        fetchTask();
    }, [taskId]);

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        try {
            const { data: newComment } = await api.addTaskComment(taskId, { userId: user.id, text: comment });
            setTask(prevTask => ({ ...prevTask, comments: [...(prevTask.comments || []), newComment] }));
            setComment('');
        } catch (error) { console.error("Failed to add comment", error); }
    };

    if (!task) return <div>Loading...</div>;

    const parentTask = task.parent ? tasks.find(t => t.id === task.parent) : null;
    const subtasks = task.subtasks ? tasks.filter(t => task.subtasks.includes(t.id)) : [];

    return (
        <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary">
            <div className="p-6 border-b border-border-primary">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full">{task.id}</span>
                            {parentTask && <Link to={`/tasks/${parentTask.id}`} className="flex items-center gap-1 text-sm text-text-muted hover:text-indigo-600"><ChevronLeft size={16} /><span>Back to: {parentTask.title}</span></Link>}
                        </div>
                        <h1 className="text-3xl font-bold mt-2 text-text-primary">{task.title}</h1>
                    </div>
                    <div className="flex items-center gap-2"><button className="px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg text-sm font-medium text-text-secondary">Share</button><button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">Complete Task</button></div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/3 p-6">
                    <div className="mb-8"><h2 className="text-lg font-semibold text-text-primary mb-3">Description</h2><p className="text-text-secondary leading-relaxed">{task.description}</p></div>
                    {subtasks.length > 0 && <div className="mb-8"><h2 className="text-lg font-semibold text-text-primary mb-4">Subtasks ({subtasks.length})</h2><div className="space-y-3">{subtasks.map(sub => (<div key={sub.id} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border border-border-primary hover:border-indigo-400"><div className="flex items-center gap-3"><input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-indigo-600" /><Link to={`/tasks/${sub.id}`} className="font-medium text-text-secondary hover:text-indigo-600">{sub.title}</Link></div><div className="flex items-center gap-3">{sub.assignees.map(id => assigneeDetails[id] && <img key={id} src={assigneeDetails[id].avatar} alt={assigneeDetails[id].name} className="w-7 h-7 rounded-full" />)}<span className="text-sm text-text-muted">{new Date(sub.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></div></div>))}</div></div>}
                    <div className="mt-8"><h3 className="text-lg font-semibold mb-3 text-text-primary">Attachments</h3><button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-2"><Paperclip className="w-4 h-4" />Add Attachment</button></div>
                    <div className="mt-8"><h3 className="text-lg font-semibold mb-3 text-text-primary">Comments</h3><div className="space-y-4 mb-4">{(task.comments || []).map((c, index) => (<div key={index} className="flex items-start gap-3"><img src={assigneeDetails[c.userId]?.avatar} className="w-10 h-10 rounded-full" alt={assigneeDetails[c.userId]?.name} /><div className="p-3 bg-bg-secondary rounded-lg w-full"><div className="flex justify-between items-center"><p className="font-semibold">{assigneeDetails[c.userId]?.name}</p><p className="text-xs text-text-muted">{new Date(c.timestamp).toLocaleString()}</p></div><p className="mt-1">{c.text}</p></div></div>))}</div><div className="flex items-start gap-3"><img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.name} /><div className="w-full"><textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="w-full p-2 rounded-md border-border-primary bg-bg-secondary"></textarea><button onClick={handleAddComment} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium">Post</button></div></div></div>
                </div>
                <div className="w-full lg:w-1/3 p-6 border-t lg:border-t-0 lg:border-l border-border-primary"><div className="space-y-6"><div><h3 className="text-sm font-semibold text-text-muted uppercase">Assignees</h3><div className="mt-3 space-y-3">{task.assignees.map(id => assigneeDetails[id] && (<div key={id} className="flex items-center gap-3"><img src={assigneeDetails[id].avatar} alt={assigneeDetails[id].name} className="w-10 h-10 rounded-full" /><span className="font-medium text-text-secondary">{assigneeDetails[id].name}</span></div>))}</div></div><div><h3 className="text-sm font-semibold text-text-muted uppercase">Priority</h3><div className="mt-3 flex space-x-2">{['Low', 'Medium', 'High'].map(p => (<button key={p} className={`px-3 py-1 text-sm rounded-full ${p === 'Low' ? 'bg-yellow-100 text-yellow-800' : p === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'} ${p === task.priority ? 'ring-2 ring-indigo-500' : ''}`}>{p}</button>))}</div></div><div><h3 className="text-sm font-semibold text-text-muted uppercase">Dates</h3><div className="mt-3 space-y-2"><div className="flex justify-between items-center"><span className="text-text-secondary">Due Date</span><span className="font-medium text-text-primary">{new Date(task.dueDate).toLocaleDateString()}</span></div><div className="flex justify-between items-center"><span className="text-text-secondary">End Date</span><span className="font-medium text-text-muted">{task.endDate}</span></div></div></div><div><h3 className="text-sm font-semibold text-text-muted uppercase">Time Estimate</h3><div className="mt-3"><span className="font-medium text-text-primary">{task.timeEstimate}</span></div></div></div></div>
            </div>
        </div>
    );
};
export default TaskDetailPage;