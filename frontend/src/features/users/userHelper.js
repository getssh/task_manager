import axios from 'axios'

const API_URL = "https://taskmanager-api-liart.vercel.app/api/users/"

const registerUser = async(userData) => {
  const response = await axios.post(API_URL+"signup", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const signinUser = async(userData) => {
  const response = await axios.post(API_URL+"signin", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const deleteUser = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL+'removeuser', config)
  return response.data
}

const logout = () => {
  localStorage.removeItem('user');
}

const userHelper = {
  registerUser,
  signinUser,
  logout,
  deleteUser,
}

export default userHelper