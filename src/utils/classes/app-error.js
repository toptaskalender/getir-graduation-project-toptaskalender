// A extended error class to handle operational errors that occur in our program
class AppError extends Error {
  constructor(statusCode, message) {
    // Set the incoming message to the message property of the parent 'Error' class
    super(message);

    // Mark the errors that are created by this class as operational errors
    this.isOperational  = true;
    // Define the error's status code using incoming statusCode parameter
    this.statusCode     = statusCode;
    // Decide the response's code key by simply looking the status code of the request.
    this.code           = String(statusCode).startsWith('4') ? 1 : 2;
  }
}

module.exports = AppError;