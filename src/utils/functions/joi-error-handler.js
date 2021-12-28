/**
 * @desc An utility function that changes default Joi error messages
 * @param {array} errors An array of one single object (because of abortEarly set to true by default) that contains metadata about the error.
 * @returns {array} A modified errors array
 */
function joiErrorHandler(errors) {
  errors.forEach(err => {
    const field   = err.local;
    
    switch (err.code) {
      case 'any.required':
        err.message = `${field.label} is a required field.`;
        break;

      case 'date.base':
        err.message = `${field.label} must be valid date.`;
        break;
      case 'date.format':
        err.message = `${field.label} must contain a date in a 'YYYY-MM-DD' format.`;
        break;
      case 'date.min':
        err.message = `${field.label} must be greater than or equal to ${ field.limit.key || field.limit}.`;
        break;

      case 'number.base':
        err.message = `${field.label} must be a type of number.`;
        break;
      case 'number.min':
        err.message = `${field.label} must be greater than or equal to ${ field.limit.key || field.limit}.`;
        break;
    }
  })

  return errors;
}

module.exports = joiErrorHandler;