const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.post('/register', studentController.registerStudent);

module.exports = router;
