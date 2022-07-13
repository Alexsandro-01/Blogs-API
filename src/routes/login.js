const express = require('express');
const login = require('../controllers/login');

const authRoute = express.Router();

authRoute.post('/login', login);

module.exports = authRoute;
