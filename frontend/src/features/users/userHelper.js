import axios from 'axios'

const API_URL = "/api/users/"

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

const getUser = async(token) => {
  const config ={
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL+'profile', config)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user');
}

const userHelper = {
  registerUser,
  signinUser,
  logout,
  getUser,
}

export default userHelper