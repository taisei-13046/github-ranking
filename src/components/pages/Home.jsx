import React, { useContext } from 'react'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GithubLoginButton } from "react-social-login-buttons";
import { auth } from "../../firebase"

import { githubProvider } from "../../firebase"
import { UserGithubContext } from '../../App';

const useStyles = makeStyles({
	logindark: {
		textAlign: "center",
		height: "900px",
		background: "#e9f9ff",
		backgroundSize: "cover",
		position: "relative",
	},
	title: {
		fontSize: "150px"
	},
	logindrakform: {
		height: "750px",
		maxWidth: "800px",
		width: "90%",
		backgroundColor: "#1e2833",
		padding: "40px",
		borderRadius: "50%",
		transform: "translate(-50%,-50%)",
		position: "absolute",
		top: "45%",
		left: "50%",
		color: "#ff9100",
		boxShadow: "3px 3px 4px rgba(0,0,0,0.2)"
	},
	description: {
		fontSize: "30px"
	},
	illustrasion: {
		textalign: "center",
		padding: "15px 0 20px",
		fontSize: "100px",
		color: "#ffff"
	},
	formcontrol: {
		width: "300px",
		outLine: "none",
		color: "inherit",
		backgroundColor: "white",
	},
	btnprimary: {
		width: "150px",
		background: "#214a80",
		border: "none",
		borderRadius: "4px",
		padding: "11px",
		boxShadow: "none",
		marginTop: "26px",
		textShadow: "none",
		outline: "none",
		"&:hover": {
			background: "#214a80",
			outLine: "none"
		},
		"&:active": {
			background: "#214a80",
			outLine: "none",
			transform: "translateY(1px)"
		}
	},
})

export const Home = (props) => {
	const { setFlag } = props
	const classes = useStyles();
	const { githubId, setGithubId } = useContext(UserGithubContext)

	const onClickLoginGithub = async () => {
		if (githubId) {
			await auth.signInWithPopup(githubProvider)
				.catch((err) => alert(err.message));
			setFlag(true)
		} else {
			alert('github ID を入力してください')
		}
	}

	return (
		<div>

			<div className={classes.logindark}>
				<div className={classes.logindrakform}>
					<div className={classes.illustrasion}>
						<h3 className={classes.title}>Github Ranking</h3>
					</div>
					<div className={classes.description}>
						<p>Githubのコミット履歴で</p>
						<p>友人と競いましょう！</p>
					</div>
					<TextField className={classes.formcontrol} id="github-id" label="github-id" variant="filled" value={githubId} onChange={(e) => setGithubId(e.target.value)} />
					<br />
					<br />
					<div >
						<GithubLoginButton className={classes.btnprimary}
							onClick={onClickLoginGithub}
							style={{ margin: "0 auto", width: "250px" }}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
