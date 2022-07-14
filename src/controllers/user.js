const { isValidUser } = require('../services/userService');

/** @type {import('express').RequestHandler} */
function create(req, res) {
  const data = req.body;

  const response = isValidUser(data);

  res.send(response);
}