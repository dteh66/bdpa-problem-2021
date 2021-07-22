import React, { useState } from 'react';
import { Link } from "react-router-dom"
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

//Navbar EXAMPLE, have not run or checked for aesthetic.
export default function Navbar() {
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          </Menu>
        </div>
        <Typography variant="h6" className={classes.title}>Navigate</Typography>
        <Avatar alt="Creative Tail Animal cat" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Creative-Tail-Animal-cat.svg/128px-Creative-Tail-Animal-cat.svg.png" />
      </Toolbar>
    </AppBar>
  );
}
