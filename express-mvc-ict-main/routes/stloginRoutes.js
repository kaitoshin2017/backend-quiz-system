const express = require('express');
const router = express.Router();
const stloginController = require('../controllers/stloginController');

// Login route
router.post('/login', stloginController.login);

module.exports = router;
