import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Get theme from local storage or default to 'light'
        return localStorage.getItem('pivot-theme') || 'light';
    });

    useEffect(() => {
        // Apply the theme to the root element
        document.documentElement.setAttribute('data-theme', theme);
        // Save theme to local storage
        localStorage.setItem('pivot-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
