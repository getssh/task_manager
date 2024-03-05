const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUser = asyncHandler(async(req, res) => {
 if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  res.status(200).json(req.user)
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

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({name, email, password: hashedPassword})

  if (user) {
    res.status(201)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Erorr('Invalid user data')
  }
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