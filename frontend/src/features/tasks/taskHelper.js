import axios from "axios";

const API_URL = 'https://taskmanager-api-liart.vercel.app/api/tasks/'

const getTasks = async(token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

const getTask = async(taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL+taskId, config)
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

const removeTask = async(taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL+taskId, config)

  return response.data
}

const updatedTask = async(taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL+taskId, taskData, config)
  return response.data
}

const taskHelper = {
  getTasks,
  addTask,
  removeTask,
  updatedTask,
  getTask,
}

export default taskHelper