// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');

// Route to register a student
router.post('/register', async (req, res) => {
  try {
    // Calling the controller function for student registration
    await studentController.registerStudent(req, res);
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Server error occurred while registering student' });
  }
});

module.exports = router;
