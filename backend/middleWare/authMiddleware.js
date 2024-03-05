const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.Authorization.split(' ')[1]

      const decode = jwt.verify(token, process.env.JWT_SECRET)
      res.user = await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized to access this resource')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorized, Token not found')
  }
})

module.exports = {protect}