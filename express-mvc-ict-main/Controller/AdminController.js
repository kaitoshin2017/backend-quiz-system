const User = require('../Model/User');

exports.getUsers = async (req, res) => { 
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });


    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}