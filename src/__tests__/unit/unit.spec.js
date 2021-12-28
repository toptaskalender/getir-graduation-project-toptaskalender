const { joiErrorHandler } = require('../../utils/functions');

describe('joiErrorHandler utility function', () => {
  const errors = [
    {
      code: 'any.required',
      message: 'default joi error message',
      local: {
        label: 'maxCount',
        key: 'maxCount'
      }
    },
    {
      code: 'date.base',
      message: 'default joi error message',
      local: {
        label: 'startDate',
        key: 'startDate',
        value: 656
      }
    },
    {
      code: 'date.format',
      message: 'default joi error message',
      local: {
        format: 'iso',
        label: 'startDate',
        value: '322',
        key: 'startDate'
      }
    },
    {
      code: 'date.min',
      message: 'default joi error message',
      local: {
        limit: {
          key: 'startDate'
        },
        value: '2021-03-28T00:00:00.00Z',
        label: 'endDate',
        key: 'endDate'
      }
    },
    {
      code: 'number.base',
      message: 'default joi error message',
      local: {
        value: '300',
        label: 'maxCount',
        key: 'maxCount'
      }
    },
    {
      code: 'number.min',
      message: 'default joi error message',
      local: {
        limit: {
          key: 'minCount'
        },
        value: 99,
        label: 'maxCount',
        key: 'maxCount'
      }
    }
  ];

  test('should change default joi error messages by looking at err.code', () => {
    const updatedErrors = joiErrorHandler(errors);

    errors.forEach((err, i) => {
      const updatedError  = updatedErrors[i];
      const field         = err.local;
      let errMessage;

      switch (err.code) {
        case 'any.required':
          errMessage = `${field.label} is a required field.`;
          break;
        case 'date.base':
          errMessage = `${field.label} must be valid date.`;
          break;
        case 'date.format':
          errMessage = `${field.label} must contain a date in a 'YYYY-MM-DD' format.`;
          break;
        case 'date.min':
          errMessage = `${field.label} must be greater than or equal to ${ field.limit.key || field.limit}.`;
          break;
        case 'number.base':
          errMessage = `${field.label} must be a type of number.`;
          break;
        case 'number.min':
          errMessage = `${field.label} must be greater than or equal to ${ field.limit.key || field.limit}.`;
          break;
      }

      expect(updatedError.message).toBe(errMessage);
    });
  });
});