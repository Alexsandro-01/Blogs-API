const blogPostService = require('../services/blogPost');

/**
 * @type {import('express').RequestHandler}
 */
async function create(req, res) {
  const data = req.body;
  const { id } = req.user;
  
  await blogPostService.validatePost(data);
  await blogPostService.ExistCategorys(data.categoryIds);
  data.userId = id;
  const post = await blogPostService.create(data); 

  res.status(201).json(post);
}

module.exports = {
  create,
};