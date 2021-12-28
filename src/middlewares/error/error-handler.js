/**
 * @desc A global error handler middleware that sends appropriate response to the client
 * @param {object} err Error object
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Next middleware function
 */
async function errorHandler(err, req, res, next) {
  // If the error is operational error, use the instance of AppError class key values
  if (err.isOperational) {
    res.status(err.statusCode).json({
      code: err.code,
      msg: err.message
    })
  } else {
    // If the error is programmer error, use appropriate key values
    res.status(500).json({
      code: 2,
      msg: 'Internal server error.'
    })
  }
}

module.exports = errorHandler;