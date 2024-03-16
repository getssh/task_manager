const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name can not be empty']
  },
  email: {
    type: String,
    required: [true, 'Email can not be empty'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password can not be empty']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)