import React from 'react'
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GithubLoginButton } from "react-social-login-buttons";
import { auth } from "../../firebase"

import { githubProvider } from "../../firebase"

const useStyles = makeStyles({
	root: {
		textAlign: "center"
	},
})

const onClickLoginGithub = (provider) => {
	auth
        .signInWithPopup(provider)
        .then((res) => {
        })
        .catch((er) => {
        })
}

export const Home = () => {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			<Grid container direction="column" >
				<Grid item xs={4} sm={4} md={4} >
					<h3>Github Ranking</h3>
				</Grid>
				<Grid item xs={4} sm={4} md={4}>
					<div>Githubのコミット履歴で</div>
					<div>友人と競いましょう！</div>
				</Grid>
				<Grid item xs={4} sm={4} md={4}>
					<GithubLoginButton
						style={{width: "300px"}}
						onClick={onClickLoginGithub(githubProvider)}
					/>
				</Grid>
			</Grid>
		</Container>
	)
}
