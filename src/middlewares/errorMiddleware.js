const errors = {
  clientError: 400,
  clientConflict: 409,
};

function errorMiddleware(err, req, res, _next) {
  const status = errors[err.name];

  if (!status) {
    res.status(500).json({ message: err.message });
    return;
  }

  res.status(status).json({ message: err.message });
}

module.exports = errorMiddleware;