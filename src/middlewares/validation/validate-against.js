const { AppError } = require('../../utils/classes');

/**
 * @desc Higher-order function that takes an schema and returns an asynchronous middleware function
 * @param {object} schema The validation schema by which request data will be validated
 * @returns {function} Asynchronous middleware function
 */
function validateAgainst(schema) {
  return async (req, res, next) => {
    const { body: payload } = req;

    const { error } = schema.validate(payload);

    if (error) {
      const message = error.details[0].message;

      // Delegate the error to the global error handler middleware
      return next(new AppError(400, message));
    }

    // If there is no error, continue with next middleware function
    next();
  }
}

module.exports = validateAgainst;