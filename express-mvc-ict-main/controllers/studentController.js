const Student = require('../models/student');

exports.registerStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send({ message: 'Student registered successfully!' });
    } catch (error) {
        res.status(400).send(error);
    }
};
