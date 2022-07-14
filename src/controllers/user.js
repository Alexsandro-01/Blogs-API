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

module.exports = {
  create,
  getAll,
};