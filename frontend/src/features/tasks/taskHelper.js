import axios from "axios";

const API_URL = '/api/tasks/'

const getTasks = async(token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

const addTask = async(taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, taskData, config)

  return response.data
}

const taskHelper = {
  getTasks,
  addTask,
}

export default taskHelper