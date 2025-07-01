// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('jane.doe@pivot.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-tertiary">
            <div className="w-full max-w-md p-8 space-y-8 bg-bg-primary rounded-2xl shadow-lg border border-border-primary">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Zap className="h-10 w-10 text-indigo-600" />
                        <span className="text-4xl font-bold text-text-primary">Pivotask</span>
                    </div>
                    <h2 className="mt-2 text-xl text-text-secondary">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-primary placeholder-gray-500 text-text-secondary rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-primary placeholder-gray-500 text-text-secondary rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {error && <p className="text-center text-sm text-red-500">{error}</p>}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LoginPage;