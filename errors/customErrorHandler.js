class CustomErrorHandler extends Error {
  constructor(message, errorCode) {
    super(message);
    this.errorCode = errorCode;
  }
}

const throwCustomError = (message, errorCode) => {
  return new CustomErrorHandler(message, errorCode);
};

module.exports = { throwCustomError, CustomErrorHandler };
