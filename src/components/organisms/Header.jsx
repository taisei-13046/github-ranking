import { AppBar, Button, createMuiTheme, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles'
import { UserEmailContext } from '../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { auth } from "../../firebase"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  header: {
    color: "#fff",
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  button: {
    marginRight: "40px"
  }
}));

const customTheme = createMuiTheme({
  mixins: {
    toolbar: {
        minHeight: 75,
    }
  },
  typography: {
    // fontFamily: "Indie Flower",
    fontSize: 25,
    button: {
        textTransform: "none"
    }
  }
});


export const Header = () => {
  const classes = useStyles();
  const history = useHistory()
  const {setUserEmail} = useContext(UserEmailContext)
  const onClickLogoutButton = () => {
    auth.signOut().then(()=>{
      setUserEmail("")
      history.push('/')
    })
    .catch( (error)=>{
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
  }
  const onClickHomeButton = () => {
	  history.push('/')
  }
  return (
    <div className={classes.root}>
        <AppBar position="static" className={classes.header} >
          <Toolbar theme={customTheme}>
            <Typography variant="h4" className={classes.title} >
            Github Ranking
            </Typography>
            <div className={classes.button}>
              <Button color="inherit" theme={customTheme} onClick={onClickHomeButton}>Home</Button>
            </div>
            <Button color="inherit" theme={customTheme} onClick={onClickLogoutButton}>Logout</Button>
          </Toolbar>
        </AppBar>
    </div>
  );
}
