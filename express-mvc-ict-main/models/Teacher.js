const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

// Hash password before saving
teacherSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined; // Remove confirmPassword from the database
    }
    next();
});

module.exports = mongoose.model('Teacher', teacherSchema);
