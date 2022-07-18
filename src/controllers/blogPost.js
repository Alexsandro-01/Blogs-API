const blogPostService = require('../services/blogPost');
const userService = require('../services/userService');

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

/** @type {import('express').RequestHandler} */
async function getById(req, res) {
  const { id } = req.params;
  const { value: postId } = await userService.isValidId(id);
  const post = await blogPostService.getById(postId);

  res.status(200).json(post);
}

/** @type {import('express').RequestHandler} */
async function updateById(req, res) {
  const { id } = req.params;
  const data = req.body;
  const userId = req.user.id;

  const { value: postId } = await userService.isValidId(id);
  const post = await blogPostService.updateById(data, postId, userId);

  res.status(200).json(post);
}

/** @type {import('express').RequestHandler} */
async function getByQuery(req, res) {
  const { q: query } = req.query;
  const { id: userId } = req.user;

  const posts = await blogPostService.getByQuery(query, userId);

  res.status(200).json(posts);
}

/** @type {import('express').RequestHandler} */
async function remove(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const { value: postId } = await userService.isValidId(id);
  await blogPostService.remove(postId, userId);

  res.sendStatus(204);
}

module.exports = {
  create,
  getAll,
  getById,
  getByQuery,
  updateById,
  remove,
};