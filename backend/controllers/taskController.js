const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')

const getTasks = asyncHandler(async(req, res) => {
  if (!req.user) {
    res.status(400)
    throw new Error('User not found')
  }
  const tasks = await Task.find({user: req.user.id})

  res.status(200).json(tasks)
})

const getTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)
  if (!req.user) {
    res.status(400)
    throw new Error('User not found')
  }

  res.status(200).json(task)
})

const createTask = asyncHandler(async(req, res) => {
  const {taskItem, priority, taskCompleted, favorite} = req.body

  if (!taskItem || !priority) {
    res.status(400)
    throw new Error('Please fill all required fields')
  } else {
    const task = await Task.create({user:req.user.id, taskItem, priority, taskCompleted, favorite})
    res.status(201).json(task)
  }
})

const updateTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authoraized')
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedTask)
})

const deleteTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authoraized')
  }

  await Task.deleteOne(task)

  res.status(200).json({id: task._id})
})

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}