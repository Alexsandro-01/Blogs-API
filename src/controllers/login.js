const authService = require('../services/authService');

async function login(req, res) {
  const data = req.body;

  await authService.validLogin(data);

  const user = await authService.getByEmail(data.email);

  const token = authService.makeToken(user);

  res.status(200).json({ token });
}

module.exports = login;