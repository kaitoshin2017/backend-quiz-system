const Student = require("../models/studentModel");

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { name, email, age, course } = req.body;
        const newStudent = new Student({ name, email, age, course });
        await newStudent.save();
        res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update student details
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: updatedStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
