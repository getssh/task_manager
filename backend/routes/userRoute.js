const express = require('express')
const router = express.Router()
const {getUser} = require('../controllers/userController')

router.post('/profile', getUser)

module.exports = router