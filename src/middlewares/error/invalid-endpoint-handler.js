const { AppError } = require('../../utils/classes');

/**
 * @desc A middleware that handles requests to unknown endpoints by delegating them to the global error middleware
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Next middleware function
 */
async function invalidEndpointHandler(req, res, next) {
  next(
    new AppError(
      404,
      `The requested endpoint ${req.method} ${req.originalUrl} was not defined on this server.`
    )
  );
}

module.exports = invalidEndpointHandler;