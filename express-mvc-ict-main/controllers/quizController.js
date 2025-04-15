const Quiz = require('../models/quizModel');
const Result = require('../models/resultModel');

exports.createQuiz = async (req, res) => {
    try {
        const { title, description, duration, questions } = req.body;
        const teacherId = req.teacher._id; // Assuming you have authentication middleware

        const quiz = new Quiz({
            title,
            description,
            teacherId,
            duration,
            questions
        });

        await quiz.save();
        res.status(201).json({
            success: true,
            message: 'Quiz created successfully',
            quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating quiz',
            error: error.message
        });
    }
};

exports.getTeacherQuizzes = async (req, res) => {
    try {
        const teacherId = req.teacher._id;
        const quizzes = await Quiz.find({ teacherId }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            quizzes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quizzes',
            error: error.message
        });
    }
};

exports.getQuizResults = async (req, res) => {
    try {
        const { quizId } = req.params;
        const results = await Result.find({ quizId })
            .populate('studentId', 'firstName lastName')
            .sort({ submittedAt: -1 });

        res.status(200).json({
            success: true,
            results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quiz results',
            error: error.message
        });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const teacherId = req.teacher._id;
        
        const totalQuizzes = await Quiz.countDocuments({ teacherId });
        const results = await Result.find({
            quizId: { $in: await Quiz.find({ teacherId }).distinct('_id') }
        });
        
        const averageScore = results.reduce((acc, curr) => acc + curr.score, 0) / results.length || 0;
        const pendingReviews = await Result.countDocuments({ 
            quizId: { $in: await Quiz.find({ teacherId }).distinct('_id') },
            status: 'pending'
        });

        res.status(200).json({
            success: true,
            stats: {
                totalQuizzes,
                averageScore,
                pendingReviews,
                totalResults: results.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
}; 