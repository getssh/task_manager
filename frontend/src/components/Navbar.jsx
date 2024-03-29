import { AppBar, Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { Assignment, Favorite, Menu as Menuiconn, TaskAlt } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.tasks.filter)

  const filterdTasks = (favFilter) => tasks && tasks.length && favFilter ? tasks.filter(task => task.favorite) :
  tasks && tasks.length && !favFilter ? tasks.filter(task => task.taskCompleted) : []

  const handleSignout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/signin');
    handleMenuClose()
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'darkcyan' }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
          <TaskAlt />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Task Manager
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <>          
            <Stack spacing={4} direction="row" mr={5} sx={{ color: 'action.action',
              display: {xs: 'block', sm: 'none', md: 'block'}
            }}>
              <Badge color="secondary" badgeContent={tasks.length} max={99}>
                <Assignment />
              </Badge>
              <Badge color="secondary" badgeContent={filterdTasks(false).length} max={99}>
                <TaskAlt />
              </Badge>
              <Badge color="secondary" badgeContent={filterdTasks(true).length} max={99}>
                <Favorite />
              </Badge>
            </Stack>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
              <Button component={Link} to="/" color="inherit" exact>
                Tasks
              </Button>
              <Button component={Link} to="/liked" color="inherit">
                Favorite
              </Button>
              <Button color="inherit" onClick={handleSignout}>
                Sign out
              </Button>
              <Avatar component={Link} to="/profile" src="/broken-image.jpg" />
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
              <Menuiconn
                sx={{width: 30, height: 30}}
                onClick={handleAvatarClick}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ display: { xs: 'flex', sm: 'flex' }, alignItems: 'center' }}>
            <Button component={Link} to="/signin" color="inherit">
              Signin
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component={Link} onClick={handleMenuClose} to="/" color="inherit" exact>Tasks</MenuItem>
        <MenuItem component={Link} onClick={handleMenuClose} to="/liked" color="inherit">Favorite</MenuItem>
        <MenuItem component={Link} onClick={handleMenuClose} to="/profile">Profile</MenuItem>
        <MenuItem onClick={handleSignout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
