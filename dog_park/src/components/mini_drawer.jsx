import * as React from 'react';

import { Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import FormControlLabel from '@mui/material/FormControlLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { MiniDrawerEntries } from '../assets/mini_drawer_entries';
const drawerWidth = 240;


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
    );
    
    export default function MiniDrawer({userToken}) {

        const theme = useTheme();
        const [open, setOpen] = React.useState(false);
  
        const [darkMode, setDarkMode] = React.useState(true)
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleThemeToggle = (event) => {
            setDarkMode(event.target.checked);
        };
        
        const handleDrawerOpen = () => {
            setOpen(true);
        };
        const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
          };

        const handleClose = () => {
            setAnchorEl(null);
          };
        const handleDrawerClose = () => {
            setOpen(false);
            };
        const darkTheme = createTheme({
                palette: {
                mode: 'dark',
                },
            });
        const lightTheme = createTheme({
            palette: {
                mode: 'light',
            },
            });
          
  return (
// pick theme based on boolean
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
    <CssBaseline />

    <Box  sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
{/* button to expand left side */}
                {userToken && <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                    >
                    <MenuIcon />
                </IconButton>}
                    <div >
{/* icon in top right of appbar to option menu */}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>

{/* menu that drops down */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            >
{/* menu Option for dark mode */}
                        <MenuItem>
                            <FormControlLabel control={
                                <Switch
                                checked={darkMode}
                                onChange={handleThemeToggle}
                                aria-label="theme"
                                />
                            }
                            label={darkMode ? 'DarkMode' : 'LightMode'}
                            /></MenuItem>
{/* logout menu option */}
                            {userToken &&<MenuItem>
                                <Link onClick={handleClose} to={"/Logout"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <FormControlLabel control={
                            <Button />
                            }
                            label={"logout"}
                            />
                            </Link>
                            </MenuItem>
                        }
                        </Menu>
                </div>
            </Toolbar>
        </AppBar>
        {userToken && <Drawer variant="permanent" open={open}>
{/* button to minimize left side */}
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
        <Divider />
{/* takes from mini_drawer_entries */}
        <List>
          {MiniDrawerEntries.map((entry, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
 {/*link sends it to a new route */}
              <Link to={entry['route']} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
{/* set icon to icon in entries */}
                  {entry['icon']}
                </ListItemIcon>
{/* set text to label in entries*/}
                <ListItemText primary={entry['label']} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>}
      <Box component="main">
        <DrawerHeader />
        <Box sx={{
        // sets top left corner to center of the screen
        position: 'absolute',
        left: '50%',
        width: "80%",
        // centers it
        transform: 'translate( -50%)',
      }}>
        <Outlet />
        </Box>
        
      </Box>
    </Box>
    </ThemeProvider>
  );
}