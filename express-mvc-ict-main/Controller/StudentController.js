exports.registerStudent = async (req, res) => {
    try {
        const { FirstName, LastName, Grade, Username, Password } = req.body; // Assuming body data

        const newStudent = await Student.create({
            FirstName,
            LastName,
            Grade,
            Username,
            Password
        });

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



