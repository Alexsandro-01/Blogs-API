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

async function isValidId(id) {
  const schema = Joi.number().required().positive();

  const userId = schema.validate(id);

  if (userId.error) {
    throwError('clientError', userId.error.message);
  }

  return userId;
}

async function create(data) {
  const user = await model.User.create(data);
  const newUser = user.toJSON();
  return newUser;
}

async function getAll() {
  const users = await model.User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
}

async function getById(id) {
  const userId = await isValidId(id);
  
  const user = await model.User.findOne({
    where: { id: userId.value },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throwError('notFound', 'User does not exist');
  }
  return user;
}

async function remove(userId) {
  const iai = await model.User.destroy({
    where: {
      id: userId,
    },
  });

  return iai;
}

module.exports = {
  isValidUser,
  isValidId,
  userExists,
  create,
  getAll,
  getById,
  remove,
};