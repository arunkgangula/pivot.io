import { Router } from 'express';
import { serviceTicketData } from '../data.js';

const router = Router();

// GET all service tickets
router.get('/', (req, res) => {
    res.json(Object.values(serviceTicketData));
});

// GET a single service ticket by ID
router.get('/:id', (req, res) => {
    const ticket = serviceTicketData[req.params.id];
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Service Ticket not found' });
    }
});

// PUT (update) a service ticket
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (serviceTicketData[id]) {
        serviceTicketData[id] = { ...serviceTicketData[id], ...updatedData };
        res.json(serviceTicketData[id]);
    } else {
        res.status(404).json({ message: 'Service Ticket not found' });
    }
});

export default router;
