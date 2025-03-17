const Student = require('../models/Student');

exports.registerStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                student
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
