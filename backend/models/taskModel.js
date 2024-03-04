const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  taskItem: {
    type: String,
    required: [true, 'Please add your task'],
  },
  priority: {
    type: String,
    enum: ['low', 'high', 'urgent'],
    required: [true, 'Please select the task priority']
  },
  taskCompleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Task', taskSchema)