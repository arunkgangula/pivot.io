
// src/pages/UsersPage.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import { useAppData } from '../context/AppContext';

const UsersPage = () => {
    const { users } = useAppData();
    const statusColors = { 'Active': 'bg-green-100 text-green-800', 'On Leave': 'bg-yellow-100 text-yellow-800', 'Inactive': 'bg-red-100 text-red-800' };

    return (
        <div>
            <div className="flex items-center justify-between mb-6"><h1 className="text-3xl font-bold">User Management</h1><button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2"><Plus size={16} />Add User</button></div>
            <div className="bg-bg-primary rounded-lg shadow-sm border overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b"><th className="p-4 font-semibold text-sm text-text-muted">Name / Title</th><th className="p-4 font-semibold text-sm text-text-muted">Email</th><th className="p-4 font-semibold text-sm text-text-muted">Status</th><th className="p-4"></th></tr></thead><tbody>{users.map(user => (<tr key={user.id} className="border-b"><td className="p-4"><div className="flex items-center gap-3"><img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.name} /><div><div className="font-bold">{user.name}</div><div className="text-sm text-text-muted">{user.title || ''}</div></div></div></td><td className="p-4 text-text-secondary">{user.email}</td><td className="p-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[user.status]}`}>{user.status}</span></td><td className="p-4 text-right"><button className="text-indigo-600 hover:underline">Edit</button></td></tr>))}</tbody></table></div>
        </div>
    );
};
export default UsersPage;