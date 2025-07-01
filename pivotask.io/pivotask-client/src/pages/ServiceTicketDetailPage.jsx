
// src/pages/ServiceTicketDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api/api.js';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppContext';

const ServiceTicketDetailPage = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const { user } = useAuth();
    const { assigneeDetails, setServiceTickets } = useAppData();

    useEffect(() => {
        api.getServiceTicket(ticketId).then(res => setTicket(res.data));
    }, [ticketId]);

    const handleUpdateTicket = async (updatedData) => {
        try {
            const { data: updatedTicket } = await api.updateServiceTicket(ticketId, updatedData);
            setTicket(updatedTicket);
            // Update the main list in context
            setServiceTickets(prev => prev.map(t => t.id === ticketId ? updatedTicket : t));
        } catch (error) {
            console.error("Failed to update ticket:", error);
        }
    };

    const handleApprove = () => handleUpdateTicket({ ...ticket, status: 'Approved', currentApproverId: null });
    const handleReject = () => {
        const reason = prompt("Reason for rejection:");
        if (reason) handleUpdateTicket({ ...ticket, status: 'Rejected', rejectionReason: reason, currentApproverId: null });
    };

    if (!ticket) return <div>Loading...</div>;

    const isApprover = ticket.currentApproverId === user.id;

    return (
        <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary">
            <div className="p-6 border-b"><div className="flex justify-between items-start"><div><span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">{ticket.id}</span><h1 className="text-3xl font-bold mt-2">{ticket.title}</h1></div>{isApprover && <div className="flex items-center gap-2"><button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded-lg">Approve</button><button onClick={handleReject} className="px-4 py-2 bg-red-600 text-white rounded-lg">Reject</button></div>}</div></div>
            <div className="flex flex-col lg:flex-row"><div className="w-full lg:w-2/3 p-6"><h2 className="text-lg font-semibold mb-3">Description</h2><p className="leading-relaxed">{ticket.description}</p><div className="mt-8"><h3 className="text-lg font-semibold mb-3">Approval History</h3><div className="space-y-4">{ticket.approvalHistory.map((log, index) => (<div key={index} className="flex items-start gap-3"><img src={assigneeDetails[log.approverId]?.avatar} className="w-10 h-10 rounded-full" alt="" /><div className="p-3 bg-bg-secondary rounded-lg w-full"><div className="flex justify-between items-center"><p className="font-semibold">{assigneeDetails[log.approverId]?.name}</p><p className="text-xs text-text-muted">{new Date(log.timestamp).toLocaleString()}</p></div><p className="mt-1"><strong>Action:</strong> {log.action}</p>{log.comments && <p className="mt-1 text-sm"><em>"{log.comments}"</em></p>}</div></div>))}</div></div></div><div className="w-full lg:w-1/3 p-6 border-t lg:border-t-0 lg:border-l space-y-6"><div><h3 className="text-sm font-semibold text-text-muted uppercase">Status</h3><p className="font-medium mt-1">{ticket.status}</p></div><div><h3 className="text-sm font-semibold text-text-muted uppercase">Current Approver</h3><p className="font-medium mt-1">{assigneeDetails[ticket.currentApproverId]?.name || 'N/A'}</p></div><div><h3 className="text-sm font-semibold text-text-muted uppercase">Created By</h3><p className="font-medium mt-1">{assigneeDetails[ticket.createdBy]?.name}</p></div><div><h3 className="text-sm font-semibold text-text-muted uppercase">Creation Date</h3><p className="font-medium mt-1">{new Date(ticket.creationDate).toLocaleDateString()}</p></div>{ticket.rejectionReason && <div><h3 className="text-sm font-semibold text-text-muted uppercase">Rejection Reason</h3><p className="font-medium mt-1 text-red-600">{ticket.rejectionReason}</p></div>}</div></div>
        </div>
    );
};
export default ServiceTicketDetailPage;