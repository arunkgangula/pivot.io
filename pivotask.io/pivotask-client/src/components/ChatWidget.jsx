
// src/components/ChatWidget.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as api from '../api/api.js';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

const ChatWidget = ({ closeChat }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { user } = useAuth();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await api.getChatMessages();
            setMessages(data);
        };
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Poll for new messages
        return () => clearInterval(interval);
    }, []);

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newMessage = { userName: user.name, text: input };
            const { data } = await api.sendChatMessage(newMessage);
            setMessages([...messages, data]);
            setInput('');
        }
    };

    return (
        <div className="fixed bottom-5 right-5 w-[350px] max-w-[90vw] bg-bg-primary border border-border-primary rounded-2xl shadow-lg flex flex-col z-50 animate-fade-in-up">
            <div className="p-4 border-b border-border-primary flex justify-between items-center">
                <h3 className="font-bold text-lg">Team Chat</h3>
                <button onClick={closeChat} className="text-text-muted"><X size={24} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto h-80">
                {messages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-2.5 mb-4">
                        <div className="flex flex-col gap-1 w-full max-w-[320px]">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-text-primary">{msg.userName}</span>
                                <span className="text-xs font-normal text-text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="leading-1.5 p-3 border-gray-200 bg-bg-secondary rounded-lg">
                                <p className="text-sm font-normal text-text-primary">{msg.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-border-primary">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-border-primary rounded-lg bg-bg-secondary"
                        autoComplete="off"
                    />
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Send</button>
                </form>
            </div>
        </div>
    );
};
export default ChatWidget;