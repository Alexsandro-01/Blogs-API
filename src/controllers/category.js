const categoryService = require('../services/category');

/** @type {import('express').RequestHandler} */
async function create(req, res) {
  const data = req.body;

  await categoryService.isValidCategory(data);

  const newCategory = await categoryService.create(data);

  res.status(201).json(newCategory);
}

async function getAll(req, res) {
  const categories = await categoryService.getAll();

  res.status(200).json(categories);
}

module.exports = {
  create,
  getAll,
};
