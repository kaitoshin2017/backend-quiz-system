const Teacher = require('../models/Teacher');

exports.registerTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).send({ message: 'Teacher registered successfully!' });
    } catch (error) {
        res.status(400).send(error);
    }
};
