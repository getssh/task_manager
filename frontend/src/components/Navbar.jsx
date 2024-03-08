import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import {AccountCircle, AddTask, Favorite, Mail, Menu, More, Notifications, Person, Search, TaskAlt} from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center" }}>
            <Button component={Link} to="/" color="inherit" exact>
              Tasks
            </Button>
            <Button component={Link} to="/liked" color="inherit">
              Favoriate
            </Button>
            <Button component={Link} to="/profile" color="inherit">
              Profile
            </Button>
          </Box>
          <Menu sx={{display: {xs: "block", sm:"none"}}}/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar