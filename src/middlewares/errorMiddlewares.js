function errorHandler(err, req, res, next) {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    detail: err.details || null,
  });
}


function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not Found',
    detail: `The requested resource ${req.originalUrl} was not found.`,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};