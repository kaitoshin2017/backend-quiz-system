// Update app.js
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./express-mvc-ict-main/routes/studentRoutes');
const teacherRoutes = require('./express-mvc-ict-main/routes/teacherRoutes');
const stloginRoutes = require('./express-mvc-ict-main/routes/stloginRoutes'); // Importing the new login routes

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/stlogin', stloginRoutes); // Adding the login routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});