import { Router } from 'express';
import { projectData } from '../data.js';

const router = Router();

// GET all projects
router.get('/', (req, res) => {
    res.json(Object.values(projectData));
});

export default router;
