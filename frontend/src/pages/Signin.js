import styled from '@emotion/styled'
import { EmailRounded, Key, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData)
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setUserData({
      ...userData,
      [name] : value
    })
  }

  if (isLoading) {
    return <div>Loading</div>
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
              value={userData.email}
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
              value={userData.password}
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