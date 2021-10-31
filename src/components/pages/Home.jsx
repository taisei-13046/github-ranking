import React from 'react'
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GithubLoginButton } from "react-social-login-buttons";
import { auth } from "../../firebase"
import { useHistory } from "react-router-dom"

import { githubProvider } from "../../firebase"

const useStyles = makeStyles({
	root: {
		textAlign: "center"
	},
})

export const Home = () => {
	const classes = useStyles();
	const history = useHistory()

	const onClickLoginGithub = async () => {
		await auth.signInWithPopup(githubProvider)
		.then(() => {
			history.push("/room")
		})
		.catch((err) => alert(err.message));
	}

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
						onClick={onClickLoginGithub}
					/>
				</Grid>
			</Grid>
		</Container>
	)
}
