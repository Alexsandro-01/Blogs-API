const express = require('express');

const blogPostController = require('../controllers/blogPost');
const tokenMiddleware = require('../middlewares/validateToken');

const route = express.Router();

route.post('/post', tokenMiddleware, blogPostController.create);
route.get('/post', tokenMiddleware, blogPostController.getAll);
route.get('/post/:id', tokenMiddleware, blogPostController.getById);
route.put('/post/:id', tokenMiddleware, blogPostController.updateById);
route.delete('/post/:id', tokenMiddleware, blogPostController.remove);

module.exports = route;