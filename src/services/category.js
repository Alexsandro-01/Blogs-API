const Joi = require('joi');
const throwError = require('../utils/throwError');
const model = require('../database/models');

async function create(data) {
  const category = await model.Category.create(data);

  return category;
}

async function getAll() {
  const categories = await model.Category.findAll();

  return categories;
}

function isValidCategory(data) {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
  });

  const response = schema.validate(data);

  if (response.error) {
    throwError('clientError', response.error.message);
  }
}

module.exports = {
  create,
  getAll,
  isValidCategory,
};