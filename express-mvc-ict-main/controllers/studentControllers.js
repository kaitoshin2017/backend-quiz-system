// controllers/studentController.js
const Student = require('../Model/Student');

exports.registerStudent = async (req, res) => {
    const { firstName, lastName, strand, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        const newStudent = new Student({ firstName, lastName, strand, username, password, confirmPassword });
        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
