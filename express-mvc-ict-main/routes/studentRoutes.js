// studentRoutes.js
const express = require('express');
const { registerStudent, loginStudent } = require('../controllers/studentController');

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent); // Adding login route

module.exports = router;
