const express = require("express");

const router = express.Router();
const UserController = require('../Controller/UserController');

router.get('/users', UserController.getUsers);


module.exports = router; 