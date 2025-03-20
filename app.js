const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./express-mvc-ict-main/routes/studentRoutes');
const teacherRoutes = require('./express-mvc-ict-main/routes/teacherRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB (updated for newer MongoDB driver versions)
mongoose.connect('mongodb://localhost:27017/studentDB')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the application if MongoDB connection fails
    });

// Use routes for students and teachers
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
