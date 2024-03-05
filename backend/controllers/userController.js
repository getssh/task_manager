const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const getUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  res.status(200)
  res.json(user)
})

const registerUser = asyncHandler(async(req, res) => {

})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_TOKEN, {
    expiresIn: '7d'
  })
}

module.exports = {
  getUser,
  registerUser,
}