const asyncHandler = require('express-async-handler')

const getTasks = asyncHandler(async(req, res) => {
  res.status(200).json({message: 'Test get tasks'})
})

module.exports = {
  getTasks
}