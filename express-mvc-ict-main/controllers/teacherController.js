const Teacher = require('../models/teacherModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT Secret key (should be in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = '24h';

exports.registerTeacher = async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword, email } = req.body;

    try {
        // Validate input
        if (!firstName || !lastName || !username || !password || !confirmPassword || !email) {
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

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ $or: [{ username }, { email }] });
        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        await newTeacher.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: newTeacher._id, role: 'teacher' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password from response
        const teacherResponse = newTeacher.toObject();
        delete teacherResponse.password;

        res.status(201).json({
            success: true,
            message: 'Teacher registered successfully',
            teacher: teacherResponse,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering teacher',
            error: error.message
        });
    }
};

exports.loginTeacher = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Find teacher and update last login
        const teacher = await Teacher.findOne({ username });
        if (!teacher) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        teacher.lastLogin = new Date();
        await teacher.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: teacher._id, role: 'teacher' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Remove password from response
        const teacherResponse = teacher.toObject();
        delete teacherResponse.password;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            teacher: teacherResponse,
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
