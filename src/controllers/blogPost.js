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

async function getAll(req, res) {
  const posts = await blogPostService.getAll();

  res.status(200).json(posts);
}

module.exports = {
  create,
  getAll,
};