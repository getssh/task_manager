import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as Menuiconn, TaskAlt } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleSignout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/signin');
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
        <MenuItem component={Link} to="/" color="inherit" exact>Tasks</MenuItem>
        <MenuItem component={Link} to="/liked" color="inherit">Favorite</MenuItem>
        <MenuItem component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={handleSignout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
