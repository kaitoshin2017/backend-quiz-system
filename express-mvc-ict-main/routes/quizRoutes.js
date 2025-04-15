const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Protect all quiz routes

router.post('/create', quizController.createQuiz);
router.get('/teacher-quizzes', quizController.getTeacherQuizzes);
router.get('/results/:quizId', quizController.getQuizResults);
router.get('/dashboard-stats', quizController.getDashboardStats);

module.exports = router; 