const express = require('express');
const userController = require('../controllers/user');
const tokenMiddleware = require('../middlewares/validateToken');

const route = express.Router();

route.post('/user', userController.create);
route.get('/user', tokenMiddleware, userController.getAll);

module.exports = route;