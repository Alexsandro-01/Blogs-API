const express = require('express');
const userController = require('../controllers/user');

const route = express.Router();

route.post('/user', userController.create);

module.exports = route;