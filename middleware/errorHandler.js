const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  // Enhanced error log with method and path
  logger.error({
    message: err.message || 'Internal Server Error',
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    status: err.status || 500,
  });

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
// This error handler logs detailed error information and sends a JSON response with the error message.