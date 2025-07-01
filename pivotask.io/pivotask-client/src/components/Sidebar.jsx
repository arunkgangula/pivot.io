import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ListTodo, FolderKanban, Ticket, Calendar, Clock, Users, Zap, ChevronsLeft, ChevronsRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isCollapsed, toggle }) => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { to: '/dashboard', icon: <LayoutDashboard size={24} />, text: 'Dashboard' },
        { to: '/tasks', icon: <ListTodo size={24} />, text: 'Tasks' },
        { to: '/projects', icon: <FolderKanban size={24} />, text: 'Projects' },
        { to: '/service-tickets', icon: <Ticket size={24} />, text: 'Service Tickets' },
        { to: '/calendar', icon: <Calendar size={24} />, text: 'Calendar' },
        { to: '/timesheet', icon: <Clock size={24} />, text: 'Timesheet' },
    ];
    
    if (user?.role === 'Admin') {
        navItems.push({ to: '/users', icon: <Users size={24} />, text: 'Users' });
    }

    return (
        <nav className={`hidden lg:flex flex-col bg-bg-nav text-text-nav transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center h-20 border-b border-border-nav px-4 justify-center">
                <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-indigo-400 flex-shrink-0" />
                    {!isCollapsed && <span className="text-2xl font-bold text-white">Pivotask</span>}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ul className="p-4">
                    {navItems.map((item) => (
                        <li key={item.to} className="mb-2">
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => `flex items-center p-3 rounded-lg hover:bg-bg-nav-hover ${isActive ? 'bg-bg-active-nav text-white font-semibold' : ''}`}
                            >
                                {item.icon}
                                {!isCollapsed && <span className="ml-3">{item.text}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4 border-t border-border-nav">
                <div className="flex items-center justify-between">
                     <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-bg-nav-hover">
                        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                    </button>
                    <button onClick={toggle} className="p-2 rounded-lg hover:bg-bg-nav-hover">
                        {isCollapsed ? <ChevronsRight size={24} /> : <ChevronsLeft size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};
export default Sidebar;