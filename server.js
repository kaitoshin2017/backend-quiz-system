const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./express-mvc-ict-main/routes/studentRoutes');
const teacherRoutes = require('./express-mvc-ict-main/routes/teacherRoutes'); // Import teacher routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes); // Use teacher routes

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentDB')
   .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));
