
// src/components/NotificationPanel.jsx
import React from 'react';
import { useAppData } from '../context/AppContext';
import * as api from '../api/api.js';

const NotificationPanel = ({ closePanel }) => {
    const { notifications, setNotifications } = useAppData();

    const handleMarkAllRead = async () => {
        const { data } = await api.markNotificationsRead();
        setNotifications(data);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-bg-primary ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-3 border-b border-border-primary flex justify-between items-center">
                <h4 className="font-semibold">Notifications {unreadCount > 0 && `(${unreadCount})`}</h4>
                <button onClick={handleMarkAllRead} className="text-sm text-indigo-600 hover:underline">Mark all as read</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <div key={n.id} className={`p-3 border-b border-border-primary text-sm ${n.read ? 'text-text-muted' : 'font-semibold bg-indigo-50'}`}>
                            {n.message}
                            <p className="text-xs text-text-muted font-normal">{new Date(n.timestamp).toLocaleTimeString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-center text-sm text-text-muted">No new notifications.</p>
                )}
            </div>
        </div>
    );
};
export default NotificationPanel;