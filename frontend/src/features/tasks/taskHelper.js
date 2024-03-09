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

const taskHelper = {
  getTasks,
}

export default taskHelper