const userService = require('../services/userService');
const authService = require('../services/authService');

/** @type {import('express').RequestHandler} */
async function create(req, res) {
  const data = req.body;

  await userService.isValidUser(data);
  
  await userService.userExists(data.email);

  const user = await userService.create(data);

  const token = authService.makeToken(user);

  res.status(201).json({ token });
}

async function getAll(_req, res) {
  const users = await userService.getAll();
  res.status(200).json(users);
}

/** @type {import('express').RequestHandler} */
async function getById(req, res) {
  const { id } = req.params;

  const user = await userService.getById(id);

  res.status(200).json(user);
}

/** @type {import('express').RequestHandler} */
async function remove(req, res) {
  const userId = req.user.id;

  await userService.remove(userId);

  res.sendStatus(204);
}

module.exports = {
  create,
  getAll,
  getById,
  remove,
};