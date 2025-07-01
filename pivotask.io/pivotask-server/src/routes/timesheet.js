import { Router } from 'express';
import { timesheetData } from '../data.js';

const router = Router();

// GET all timesheet data
router.get('/', (req, res) => {
    res.json(timesheetData);
});

// PUT (update) the entire timesheet object
router.put('/', (req, res) => {
    const newTimesheetData = req.body;
    // This replaces the entire in-memory object.
    // In a real DB, you'd update specific entries.
    for (const key in newTimesheetData) {
        timesheetData[key] = newTimesheetData[key];
    }
    res.json(timesheetData);
});

export default router;
