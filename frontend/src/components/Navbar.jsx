import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import {Menu, TaskAlt} from '@mui/icons-material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {logout} from '../features/users/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state)=>state.user)

  const handleSignout = () => {
    dispatch(logout())
    navigate('/signin')
  }

  return (
    <Box>
      <AppBar position="static" sx={{bgcolor: "darkcyan"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <TaskAlt />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Task Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

         
          {
            user ? 
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center" }}>
              <Button component={Link} to="/" color="inherit" exact>
                Tasks
              </Button>
              <Button component={Link} to="/liked" color="inherit">
                Favoriate
              </Button>

              <Button color="inherit"
                onClick={handleSignout}
              >
                Sign out
              </Button>
                <Avatar
                  component={Link}
                  to="/profile"
                  src="/broken-image.jpg"
                />
              </Box>
             :
             <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center" }}> 
              <Button component={Link} to="/signin" color="inherit">
                Signin
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Signup
              </Button>
            </Box>
          }
          <Menu sx={{display: {xs: "block", sm:"none"}}}/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar