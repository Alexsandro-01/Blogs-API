const categoryService = require('../services/category');

/** @type {import('express').RequestHandler} */
async function create(req, res) {
  const data = req.body;

  await categoryService.isValidCategory(data);

  const newCategory = await categoryService.create(data);

  res.status(201).json(newCategory);
}

module.exports = {
  create,
};
