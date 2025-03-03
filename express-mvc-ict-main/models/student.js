const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    sectionId: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined; // Remove confirmPassword from the database
    }
    next();
});

module.exports = mongoose.model('Student', studentSchema);
