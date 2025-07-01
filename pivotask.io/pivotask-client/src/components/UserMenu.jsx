
// src/components/UserMenu.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ closeMenu }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        closeMenu();
        logout();
    };
    
    const handleNavigate = (path) => {
        navigate(path);
        closeMenu();
    }

    return (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-bg-primary ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
                <a href="#" onClick={(e) => { e.preventDefault(); /* Open Settings Modal */ }} className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary">Settings</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/org-chart') }} className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary">Org Chart</a>
                <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary">Logout</a>
            </div>
        </div>
    );
};
export default UserMenu;