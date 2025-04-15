const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'default-avatar.png' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    notifications: [{
        message: String,
        type: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
