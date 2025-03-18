const Teacher = require('../models/teacherModel');
const bcrypt = require('bcrypt');

exports.registerTeacher = async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newTeacher = new Teacher({ firstName, lastName, username, password: hashedPassword });
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher registered successfully', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error: error.message });
    }
};