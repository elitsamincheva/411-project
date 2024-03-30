import * as React from 'react'; // Import React library
import AppBar from '@mui/material/AppBar'; // Import AppBar component from Material-UI
import Box from '@mui/material/Box'; // Import Box component from Material-UI
import Toolbar from '@mui/material/Toolbar'; // Import Toolbar component from Material-UI
import IconButton from '@mui/material/IconButton'; // Import IconButton component from Material-UI
import Typography from '@mui/material/Typography'; // Import Typography component from Material-UI
import Menu from '@mui/material/Menu'; // Import Menu component from Material-UI
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon component from Material-UI
import Container from '@mui/material/Container'; // Import Container component from Material-UI
import Avatar from '@mui/material/Avatar'; // Import Avatar component from Material-UI
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component from Material-UI
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component from Material-UI
import AdbIcon from '@mui/icons-material/Adb'; // Import AdbIcon component from Material-UI

// List of pages and settings
const pages = ['Recipe Search']; // List of navigation pages
const settings = ['Favorites', 'Logout']; // List of user settings

function TopMenuBar() {
  // State variables for menu anchors
  const [anchorElNav, setAnchorElNav] = React.useState(null); // State variable for navigation menu
  const [anchorElUser, setAnchorElUser] = React.useState(null); // State variable for user menu

  // Handlers for opening and closing navigation menu
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
    // Top app bar component
    <AppBar position="static">
      {/* Container for limiting width */}
      <Container maxWidth="xl">
        {/* Toolbar within the app bar */}
        <Toolbar disableGutters>
          {/* Logo section for larger screens */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> {/* Logo icon */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            beat bite {/* Logo text */}
          </Typography>

          {/* Hamburger icon for mobile navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon /> {/* Menu icon */}
            </IconButton>
          </Box>
          
          {/* Placeholder logo for mobile */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> {/* Placeholder logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO {/* Placeholder text */}
          </Typography>
          
          {/* Navigation buttons for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* Map through pages and render buttons */}
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page} {/* Page name */}
              </Button>
            ))}
          </Box>

          {/* User menu icon with settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings"> {/* Tooltip */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> {/* User avatar */}
              </IconButton>
            </Tooltip>
            {/* Dropdown menu for user settings */}
            <Menu
              sx={{ mt: '45px' }}
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
              {/* Map through settings and render menu items */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography> {/* Setting name */}
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
