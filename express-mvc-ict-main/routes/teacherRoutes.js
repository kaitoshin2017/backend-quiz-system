// routes/teacherRoutes.js
const express = require('express');
const Teacher = require('../models/teacherModel');
const router = express.Router();

// POST route for teacher registration
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        const newTeacher = new Teacher({ firstName, lastName, username, password, confirmPassword });
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error });
    }
});

module.exports = router;