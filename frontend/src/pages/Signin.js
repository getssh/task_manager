import styled from '@emotion/styled'
import { EmailRounded, Key, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { useState } from 'react'

const FormBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "10px",
  marginTop: "5%",
})
const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
  })
  return (
    <>
      <Typography variant='h4' textAlign="center" mt={3}>Log In</Typography>
      <FormBox>
        <Box sx={{bgcolor: "lightcyan", display:"flex", gap:5,
          flexDirection: "column", width: {xs:"90%", sm:"50%", md:"50%", lg:"30%"},
          borderRadius: 5,
        }} p={5}>
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              type='email'
              placeholder='Email Address'
              startAdornment={
                <InputAdornment position="start">
                  <EmailRounded />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              type={user.showPassword ? 'text' : 'password'}
              placeholder='Password'
              startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setUser({...user, showPassword: !user.showPassword})}
                  edge="end"
                  >
                  {user.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <Button variant="contained">LogIn</Button>
          </FormControl>
        </Box>
      </FormBox>
    </>
  )
}

export default Signin