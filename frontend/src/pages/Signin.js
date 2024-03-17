import styled from '@emotion/styled'
import { Cached, EmailRounded, Key, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {reset, signinUser} from '../features/users/userSlice'

const FormBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "10px",
  marginTop: "5%",
})
const Signin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    showPassword: false,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {email, password} = userData
  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.user)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch, user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userInfo = {email, password}
    dispatch(signinUser(userInfo))
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setUserData({
      ...userData,
      [name] : value
    })
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
      <Typography variant='h4' textAlign="center" mt={3}>Log In</Typography>
      <FormBox>
        <Box onSubmit={handleSubmit} component="form" sx={{bgcolor: "lightcyan", display:"flex", gap:5,
          flexDirection: "column", width: {xs:"90%", sm:"50%", md:"50%", lg:"30%"},
          borderRadius: 5,
        }} p={5}>
          <FormControl variant="standard">
            <Input
              type='email'
              placeholder='Email Address'
              name='email'
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
              name='password'
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
            <Button variant="contained" type='submit'>LogIn</Button>
          </FormControl>
        </Box>
      </FormBox>
    </>
  )
}

export default Signin