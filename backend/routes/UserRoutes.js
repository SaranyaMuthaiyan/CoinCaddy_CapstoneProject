// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Signup route
router.post('/register', async (req, res) => {
  try {
    const { email, password, acceptedTerms } = req.body;
    const newUser = new User({ email, password, acceptedTerms });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route (simple matching)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



export default router;
