const express = require('express');
const router = express.Router();
const StudentController = require('../Controller/StudentController');

router.post('/register', StudentController.registerStudent);

module.exports = router;
