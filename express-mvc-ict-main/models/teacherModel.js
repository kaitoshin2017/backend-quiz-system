// models/teacherModel.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;