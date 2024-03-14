const express = require('express')
const router = express.Router()
const {getTasks, createTask, updateTask, deleteTask, getTask} = require('../controllers/taskController')
const {protect} = require('../middleWare/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, createTask)
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask).get(protect, getTask)

module.exports = router