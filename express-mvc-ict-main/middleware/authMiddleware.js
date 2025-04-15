const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

exports.protect = async (req, res, next) => {
    try {
        // Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if user still exists
        let user;
        if (decoded.role === 'teacher') {
            user = await Teacher.findById(decoded.id);
            req.teacher = user;
        } else if (decoded.role === 'student') {
            user = await Student.findById(decoded.id);
            req.student = user;
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
            error: error.message
        });
    }
};

// Restrict access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.role} is not authorized to access this route`
            });
        }
        next();
    };
}; 