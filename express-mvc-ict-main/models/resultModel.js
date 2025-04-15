const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    score: { type: Number, required: true },
    timeTaken: { type: Number, required: true }, // in minutes
    answers: [{
        questionId: String,
        selectedAnswer: String,
        isCorrect: Boolean
    }],
    status: { 
        type: String, 
        enum: ['completed', 'pending', 'failed'],
        default: 'completed'
    },
    submittedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result; 