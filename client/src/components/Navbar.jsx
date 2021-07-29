import React, { useState } from 'react';
import { Link } from "react-router-dom"
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';

export default function Navbar({ token, setToken }) {
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  //axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    await axios.delete(`http://localhost:3001/auth/delete-token`, {
        data: {
            token,
        },
    });
    setToken(() => '');
  }

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/home">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/home">Layout</Link>
            </MenuItem>
          </Menu>
        </div>
        <Typography variant="h6" className={classes.title}>Navigate</Typography>
        <Avatar alt="Creative Tail Animal cat" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Creative-Tail-Animal-cat.svg/128px-Creative-Tail-Animal-cat.svg.png" />
        {token && (
            <Button>
                <Link to='/login'>
                    Logout
                </Link>
            </Button>
        )}
        {!token && (
            <Button>
                <Link to='/register'>
                    Register
                </Link>
            </Button>
        )}
        {!token && (
            <Button>
                <Link to='/login'>
                    Login
                </Link>
            </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}
