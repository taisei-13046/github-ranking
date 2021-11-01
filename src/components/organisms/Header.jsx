import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles'
import { UserEmailContext } from '../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
  const history = useHistory()
  const {setUserEmail} = useContext(UserEmailContext)
  const onClickLogoutButton = () => {
	setUserEmail("")
  }
  const onClickHomeButton = () => {
	  history.push('/')
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          Github Ranking
          </Typography>
          <Button color="inherit" onClick={onClickHomeButton}>Home</Button>
          <Button color="inherit" onClick={onClickLogoutButton}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
