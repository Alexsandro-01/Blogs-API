const express = require('express');
const categoryController = require('../controllers/category');
const tokenMiddleware = require('../middlewares/validateToken');

const route = express.Router();

route.post('/categories', tokenMiddleware, categoryController.create);

module.exports = route;