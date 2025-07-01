
// src/pages/ServiceTicketsPage.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import { useAppData } from '../context/AppContext';
import TicketCard from '../components/TicketCard';

const ServiceTicketsPage = () => {
    const { serviceTickets } = useAppData();
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-text-primary">Service Tickets</h1>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus size={16} />Create Service Ticket</button>
            </div>
            <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-x-auto">
                <table className="w-full text-left">
                    <thead><tr className="border-b border-border-primary"><th className="p-4 font-semibold text-sm text-text-muted">Ticket ID</th><th className="p-4 font-semibold text-sm text-text-muted">Title</th><th className="p-4 font-semibold text-sm text-text-muted">Status</th><th className="p-4 font-semibold text-sm text-text-muted">Current Approver</th><th className="p-4 font-semibold text-sm text-text-muted">Created Date</th></tr></thead>
                    <tbody>
                        {serviceTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ServiceTicketsPage;