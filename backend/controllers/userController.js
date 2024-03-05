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
  const {name, email, password} = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill all required feilds')
  }

  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({name, email, password})
  res.status(200)
  res.json({
    id: user._id,
    name,
    email,
    token: generateToken(user._id),
  })
})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}

module.exports = {
  getUser,
  registerUser,
}