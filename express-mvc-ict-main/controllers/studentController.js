const Student = require('../Model/Student');

exports.registerStudent = async (req, res) => {
    try {
        const { firstName, lastName, section, username, password } = req.body;
        const newStudent = await Student.create({ firstName, lastName, section, username, password });
        res.status(201).json({
            status: 'success',
            data: {
                student: newStudent
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
