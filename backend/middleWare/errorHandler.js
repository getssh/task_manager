const errorHandler = async(err, req, res, next) => {
  const statusCode = res.status ? res.status : 500

  res.status = statusCode

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = errorHandler