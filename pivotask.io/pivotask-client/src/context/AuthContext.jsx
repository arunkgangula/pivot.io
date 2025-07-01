import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem('currentUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from session storage", error);
            sessionStorage.removeItem('currentUser');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await loginApi(credentials);
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('currentUser');
        setUser(null);
    };

    const value = { user, login, logout, loading };

    // Render children only when not loading to prevent route flicker
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);