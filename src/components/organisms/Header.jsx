import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles'
import { UserEmailContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));


export const Header = () => {
  const classes = useStyles();
  const {setUserEmail} = useContext(UserEmailContext)
  const onClickLogoutButton = () => {
	setUserEmail("")
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          Github Ranking
          </Typography>
          <Button color="inherit" onClick={onClickLogoutButton}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
