const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    section: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    quizzesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }],
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;