// Import recordService to communicate with the 'records' collection in the database
const { recordService } = require('../services');

/**
 * @desc Asynchronous controller that fetches matched records
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Next middleware function
 */
async function getRecords(req, res, next) {
  try {
    const { body: filter } = req;
    // Fetch matched records by awaiting the mongoose's aggregate object
    const records = await recordService.findByDateAndTotalCount(filter);

    res.status(200).json({
      code: 0,
      msg: 'success',
      records
    });
  } catch (e) {
    // If there is an error, delegate it to the global error handler middleware
    next(e);
  }
}

module.exports = {
  getRecords
}