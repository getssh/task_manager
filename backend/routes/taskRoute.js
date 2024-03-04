const express = require('express')
const router = express.Router()
const {getTasks, createTask, updateTask} = require('../controllers/taskController')

router.route('/').get(getTasks).post(createTask)
router.route('/:id').put(updateTask)

module.exports = router