const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');

exports.registerStudent = async (req, res) => {
    const { firstName, lastName, section, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
        firstName,
        lastName,
        section,
        username,
        password: hashedPassword,
    });

    try {
        await student.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
};

exports.loginStudent = async (req, res) => {
    const { username, password } = req.body;

    const student = await Student.findOne({ username });
    if (!student) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', student });
};