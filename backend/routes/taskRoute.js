const express = require('express')
const router = express.Router()
const {getTasks} = require('../controllers/taskController')

router.get('/', getTasks)

module.exports = router