const mongoose = require("mongoose");

// Define Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
