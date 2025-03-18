const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentLoginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving
studentLoginSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const StudentLogin = mongoose.model('StudentLogin', studentLoginSchema);

module.exports = StudentLogin;
