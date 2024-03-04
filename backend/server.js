const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const mongoDB = require('./config/db')

const app = express()
mongoDB()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})