const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT Secret key (should be in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = '24h';

exports.registerStudent = async (req, res) => {
    try {
        const { firstName, lastName, section, username, password, confirmPassword, birthDate, email } = req.body;

        // Validate input
        if (!firstName || !lastName || !section || !username || !password || !confirmPassword || !birthDate || !email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ $or: [{ username }, { email }] });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            firstName,
            lastName,
            section,
            username,
            email,
            password: hashedPassword,
            birthDate,
            createdAt: new Date()
        });

        await student.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password from response
        const studentResponse = student.toObject();
        delete studentResponse.password;

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            student: studentResponse,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering student',
            error: error.message
        });
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        const student = await Student.findOne({ username });
        if (!student) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        student.lastLogin = new Date();
        await student.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password from response
        const studentResponse = student.toObject();
        delete studentResponse.password;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            student: studentResponse,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};