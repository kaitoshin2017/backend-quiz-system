// stloginController.js
const StudentLogin = require('../models/stloginModel');

// Login function
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const student = await StudentLogin.findOne({ username, password });
        if (student) {
            return res.status(200).json({ message: 'Login successful', student });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

