import React, { useContext } from 'react'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GithubLoginButton } from "react-social-login-buttons";
import { auth } from "../../firebase"

import { githubProvider } from "../../firebase"
import { UserGithubContext } from '../../App';

const useStyles = makeStyles({
	root: {
		textAlign: "center"
	},
})

export const Home = (props) => {
	const {flag, setFlag} = props
	const classes = useStyles();
	const {githubId, setGithubId} = useContext(UserGithubContext)

	const onClickLoginGithub = async () => {
		console.log(githubId)
		if (githubId) {
			await auth.signInWithPopup(githubProvider)
			.catch((err) => alert(err.message));
			setFlag(true)
		} else {
			alert('github ID を入力してください')
		}
	}

	return (
		<div className={classes.root}>
			<div>
				<div>
					<h3>Github Ranking</h3>
				</div>
				<div>
					<div>Githubのコミット履歴で</div>
					<div>友人と競いましょう！</div>
				</div>
				<TextField id="github-id" label="github-id" variant="outlined" value={githubId} onChange={(e) => setGithubId(e.target.value)} />
				<div>
					<GithubLoginButton
						style={{width: "300px"}}
						onClick={onClickLoginGithub}
					/>
				</div>
			</div>
		</div>
	)
}
