const Joi = require('joi');
const JWT = require('jsonwebtoken');
const model = require('../database/models');
require('dotenv').config();

const throwError = require('../utils/throwError');

const SECRET = process.env.JWT_SECRET;

async function validLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(255),
  });

  const response = schema.validate(data);

  if (response.error) {
    throwError('clientError', 'Some required fields are missing');
  }
}

async function getByEmail(email) {
  const user = await model.User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throwError('clientError', 'Invalid fields');
  }

  return user.toJSON();
}

function makeToken(data) {
  const { password, ...user } = data;
  const payload = { data: { ...user } };
  const token = JWT.sign(payload, SECRET);

  return token;
}

function readToken(token) {
  try {
    const { data } = JWT.verify(token, SECRET);
    return data;
  } catch (e) {
    throwError('JsonWebTokenError', 'Expired or invalid token');  
  }
}

module.exports = {
  validLogin,
  getByEmail,
  makeToken,
  readToken,
};
