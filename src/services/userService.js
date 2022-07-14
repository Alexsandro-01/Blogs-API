const Joi = require('joi');

function isValidUser(data) {
  const schema = Joi.object({
    displayName: Joi.string().required().min(8).max(255),
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(6).max(255),
  });
}

module.exports = {
  isValidUser,
};