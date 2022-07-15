const express = require('express');

const blogPostController = require('../controllers/blogPost');
const tokenMiddleware = require('../middlewares/validateToken');

const route = express.Router();

route.post('/post', tokenMiddleware, blogPostController.create);

module.exports = route;