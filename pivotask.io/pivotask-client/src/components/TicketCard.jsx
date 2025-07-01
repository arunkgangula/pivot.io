
// src/components/TicketCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppContext';

const TicketCard = ({ ticket }) => {
    const navigate = useNavigate();
    const { assigneeDetails } = useAppData();

    const statusColors = {
        'Pending Level 1 Approval': 'text-blue-600 bg-blue-100',
        'Pending Level 2 Approval': 'text-blue-600 bg-blue-100',
        'Pending Level 3 Approval': 'text-blue-600 bg-blue-100',
        'On-Hold': 'text-yellow-600 bg-yellow-100',
        'Rejected': 'text-red-600 bg-red-100',
        'Cancelled': 'text-slate-600 bg-slate-100',
        'Approved': 'text-green-600 bg-green-100'
    };

    return (
        <tr onClick={() => navigate(`/service-tickets/${ticket.id}`)} className="border-b border-border-primary hover:bg-bg-secondary cursor-pointer">
            <td className="p-4 font-medium text-text-primary">{ticket.id}</td>
            <td className="p-4 text-text-secondary">{ticket.title}</td>
            <td className="p-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[ticket.status] || ''}`}>
                    {ticket.status}
                </span>
            </td>
            <td className="p-4 text-text-secondary">{assigneeDetails[ticket.currentApproverId]?.name || 'N/A'}</td>
            <td className="p-4 text-sm text-text-muted">{new Date(ticket.creationDate).toLocaleDateString()}</td>
        </tr>
    );
};
export default TicketCard;