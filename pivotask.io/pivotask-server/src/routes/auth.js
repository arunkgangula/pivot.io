import { Router } from 'express';
import { userData } from '../data.js';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(userData).find(u => u.email === email);

    if (user && user.password === password) {
        // In a real app, you'd return a JWT token.
        // Here, we just return the user object without the password.
        const userToReturn = { ...user };
        delete userToReturn.password;
        res.json(userToReturn);
    } else {
        res.status(401).json({ message: 'Invalid email or password.' });
    }
});

export default router;
