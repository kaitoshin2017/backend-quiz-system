// stloginModel.js
const mongoose = require('mongoose');

const studentLoginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const StudentLogin = mongoose.model('StudentLogin', studentLoginSchema);

module.exports = StudentLogin;
