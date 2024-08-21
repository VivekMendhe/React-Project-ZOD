class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

// usage: new ErrorHandler("User not found!", 404);

module.exports = ErrorHandler;
