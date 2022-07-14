const model = require('../database/models');
const authService = require('../services/authService');
const throwError = require('../utils/throwError');

async function tokenMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    throwError('JsonWebTokenError', 'Token not found');
  }

  const data = authService.readToken(token);
    
  const user = await model.User.findOne({ 
    where: { 
      email: data.email,
    }, 
  });

  if (!user) {
      throwError('JsonWebTokenError', 'Expired or invalid token');
  }

  req.user = user;
  next();
}

module.exports = tokenMiddleware;