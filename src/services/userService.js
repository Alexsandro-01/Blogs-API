const Joi = require('joi');
const throwError = require('../utils/throwError');
const model = require('../database/models');

async function userExists(email) {
  const exist = await model.User.findOne({
    where: {
      email,
    },
  });

  if (exist) {
    throwError('clientConflict', 'User already registered');
  }
}

async function isValidUser(data) {
  const schema = Joi.object({
    displayName: Joi.string().required().min(8).max(255),
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(6).max(255),
    image: Joi.string().max(255),
  });

  const response = schema.validate(data);

  if (response.error) {
    throwError('clientError', response.error.message);
  }
}

async function create(data) {
  const user = await model.User.create(data);
  const newUser = user.toJSON();
  return newUser;
}

module.exports = {
  isValidUser,
  userExists,
  create,
};