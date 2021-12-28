const router          = require('express').Router();
const {
  validateAgainst
}                     = require('../middlewares');
const {
  getRecordsSchema
}                     = require('../validations');
const { getRecords }  = require('../controllers/records');

router.post(
  '/',
  // Validate request data with the help of Joi schema
  validateAgainst(getRecordsSchema),
  getRecords
);

module.exports = router;