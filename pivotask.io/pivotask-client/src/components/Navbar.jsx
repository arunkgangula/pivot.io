
// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, MessageSquare, Bell } from 'lucide-react';
import UserMenu from './UserMenu';
import NotificationPanel from './NotificationPanel';
import ChatWidget from './ChatWidget';

const Navbar = () => {
    const { user } = useAuth();
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isChatOpen, setChatOpen] = useState(false);

    return (
        <>
            <header className="h-20 flex items-center justify-between lg:justify-end px-8 bg-bg-primary border-b border-border-primary flex-shrink-0">
                <div className="flex-1 flex items-center gap-4">
                    <div className="relative w-full max-w-xs">
                        <input type="text" placeholder="Search tasks, projects..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-primary bg-bg-secondary focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-text-muted" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setChatOpen(prev => !prev)} className="p-2 rounded-full hover:bg-bg-secondary text-text-muted">
                        <MessageSquare size={24} />
                    </button>
                    <div className="relative">
                        <button onClick={() => setNotificationsOpen(prev => !prev)} className="p-2 rounded-full hover:bg-bg-secondary text-text-muted relative">
                            <Bell size={24} />
                        </button>
                        {isNotificationsOpen && <NotificationPanel closePanel={() => setNotificationsOpen(false)} />}
                    </div>
                    <div className="relative">
                        <div onClick={() => setUserMenuOpen(prev => !prev)} className="flex items-center gap-4 cursor-pointer">
                            <span className="font-medium text-text-secondary hidden md:block">{user.name}</span>
                            <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        </div>
                        {isUserMenuOpen && <UserMenu closeMenu={() => setUserMenuOpen(false)} />}
                    </div>
                </div>
            </header>
            {isChatOpen && <ChatWidget closeChat={() => setChatOpen(false)} />}
        </>
    );
};
export default Navbar;