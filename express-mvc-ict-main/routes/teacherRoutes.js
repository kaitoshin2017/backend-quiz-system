const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', teacherController.registerTeacher);
router.post('/login', teacherController.loginTeacher);

// Protected routes (only for teachers)
router.use(protect); // Apply protection to all routes below
router.use(authorize('teacher')); // Only allow teachers

// Add your protected routes here
router.get('/profile', teacherController.getProfile);
router.put('/profile', teacherController.updateProfile);

module.exports = router;
