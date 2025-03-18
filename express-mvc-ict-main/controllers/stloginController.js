const StudentLogin = require('../models/stloginModel');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find student by username
        const student = await StudentLogin.findOne({ username });
        if (!student) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login
        return res.status(200).json({ 
            message: 'Login successful', 
            student: {
                firstName: student.firstName,
                lastName: student.lastName,
                section: student.section,
                username: student.username
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
