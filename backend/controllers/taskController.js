const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')

const getTasks = asyncHandler(async(req, res) => {
  const tasks = await Task.find()

  res.status(200).json(tasks)
})

const createTask = asyncHandler(async(req, res) => {
  const {taskItem, priority, taskCompleted} = req.body

  if (!taskItem || !priority) {
    res.status(400)
    throw new Error('Please fill all required fields')
  } else {
    const task = await Task.create({taskItem, priority, taskCompleted})
    res.status(200).json(task)
  }
})

module.exports = {
  getTasks,
  createTask,
}