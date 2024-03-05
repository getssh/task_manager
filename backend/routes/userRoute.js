const express = require('express')
const router = express.Router()
const { registerUser, getUser } = require('../controllers/userController')
const {protect} = require('../middleWare/authMiddleware')

router.get('/profile', protect, getUser)
router.post('/signup', registerUser)

module.exports = router