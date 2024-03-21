import styled from '@emotion/styled'
import { AccountCircle, Cached, EmailRounded, Key, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {registerUser, reset} from '../features/users/userSlice'
import { toast } from 'react-toastify'

const FormBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "10px",
  marginTop: "5%",
})
const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {name, email, password, confirmPassword} = userData
  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.user)

  useEffect(()=> {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, dispatch, navigate])

  const handleChange = (e) => {
    const {name, value} = e.target

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password do not match")
    } else if (password.length < 8) {
      toast.error("Password should be atleast 8 charachter")
    }
    else  {
      const userInfo = {name, email, password}

      dispatch(registerUser(userInfo))
    }
  }

  if (isLoading) {
    return (
      <Box flex={4} sx={{
        position: 'fixed', top: '50%', left: '50%',
        textAlign:'center', justifyContent:'center'}}>
        <Cached sx={{width: '5rem', height: '5rem'}}/>
      </Box>
    )
  }

  return (
    <>
      <Typography variant='h4' textAlign="center" mt={3}>New User Registration</Typography>
      <FormBox>
        <Box component="form" onSubmit={handleSubmit} sx={{bgcolor: "lightcyan", display:"flex", gap:5,
          flexDirection: "column", width: {xs:"90%", sm:"50%", md:"50%", lg:"40%"},
          borderRadius: 5,
        }} p={5}>
          <FormControl variant="standard">
            <Input
              type='text'
              placeholder='Name'
              name="name"
              value={name}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <Input
              type='email'
              placeholder='Email Address'
              name="email"
              value={email}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <EmailRounded />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <Input
              type={userData.showPassword ? 'text' : 'password'}
              placeholder='Password'
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setUserData({...userData, showPassword: !userData.showPassword})}
                  edge="end"
                  >
                  {userData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <Input
              type={userData.showPassword ? 'text' : 'password'}
              placeholder='Password'
              name="password"
              value={password}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setUserData({...userData, showPassword: !userData.showPassword})}
                  edge="end"
                  >
                  {userData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <Button variant="contained" type='submit'>Sign Up</Button>
          </FormControl>
        </Box>
      </FormBox>
    </>
  )
}

export default Signup