// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    strand: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
