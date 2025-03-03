// controllers/teacherController.js
const Teacher = require('../Model/Teacher');
const bcrypt = require('bcryptjs');

exports.registerTeacher = async (req, res) => {
    const { firstName, lastName, TCHID, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new Teacher({
            firstName,
            lastName,
            TCHID,
            username,
            password: hashedPassword
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error registering teacher.", error });
    }
};
