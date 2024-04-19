import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const pages = ['Recipe Search'];
const settings = ['Favorites', 'Logout'];

function TopMenuBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userAvatar, setUserAvatar] = useState(null); // State to store user's avatar URL
  const navigateTo = useNavigate();

  useEffect(() => {
    // Function to fetch user's profile information from Spotify's API
    const fetchUserProfile = async () => {
      try {
        // Make GET request to Spotify's API to fetch user's profile
        const response = await fetch('http://localhost:3000/user', { credentials: 'include' });

        if (response.ok) {
          let data = await response.json();
          // Extract the user's avatar URL from the response
          const avatarUrl = data.images[0].url;

          // Update the user's avatar state with the retrieved URL
          setUserAvatar(avatarUrl);
        } else {
          navigateTo('/login')
        }

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Call the fetchUserProfile function when the component mounts
    fetchUserProfile();
  }, [navigateTo]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#F19C79', fontFamily: '"Roboto Mono", monospace', paddingTop: '10px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ p: 2 }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#F6F4D2',
              textDecoration: 'none',
              fontSize: '1.5rem',
            }}
          >
            BeatBite
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#F6F4D2',
              textDecoration: 'none',
              fontSize: '0.7rem', // Adjust font size here
            }}
          >
            Recipe Search
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={userAvatar} sx={{ color: '#F19C79', bgcolor: '#F6F4D2' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '55px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ color: '#A44A3F', '&:hover': { backgroundColor: '#F6F4D2' } }}>
                  <Typography textAlign="center" fontFamily='"Roboto Mono", monospace'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#F6F4D2"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopMenuBar;
