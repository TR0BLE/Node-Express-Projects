const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Try again later.'
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No Item found with ID : ${err.value}`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate Value entered for ${Object.keys(err.keyValue)}. Please choose another value`
    customError.statusCode = 400
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
