import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="h-screen w-full flex bg-bg-tertiary">
            <Sidebar isCollapsed={isSidebarCollapsed} toggle={toggleSidebar} />
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                    <footer className="text-center py-8 text-text-muted text-sm">
                        © 2024 Pivotask.io. All rights reserved.
                    </footer>
                </main>
            </div>
        </div>
    );
};
export default Layout;