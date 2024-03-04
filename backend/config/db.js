const mongoose = require('mongoose')

const mongoDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongodb connect ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = mongoDB