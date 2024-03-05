const express = require('express')
const router = express.Router()
const { registerUser, getUser, signIn, deleteUser } = require('../controllers/userController')
const {protect} = require('../middleWare/authMiddleware')

router.get('/profile', protect, getUser)
router.post('/signup', registerUser)
router.post('/signin', signIn)
router.delete('/removeuser', protect, deleteUser)

module.exports = router