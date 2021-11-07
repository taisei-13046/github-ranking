import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { db } from "../../firebase"
import { RoomInfoContext, UserGithubContext } from '../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
	logindark: {
		textAlign: "center",
		height: "350px",
		position: "relative",
	},
	logindrakform: {
		maxWidth: "600px",
		width: "90%",
		backgroundColor: "#ffffff",
		padding: "40px",
		borderRadius: "50%",
		transform: "translate(-50%,-50%)",
		position: "absolute",
		top: "50%",
		left: "50%",
		color: "#000000",
		boxShadow: "3px 3px 4px rgba(0,0,0,0.2)"
	},
	illustrasion: {
		textalign: "center",
		padding: "15px 0 20px",
		fontSize: "100px",
		color: "#000000"
	},
	formcontrol: {
		width: "200px",
		background: "#fff",
		border: "none",
		borderBottom: "1px solid #434a52",
		borderRadius: "0",
		boxShadow: "none",
		outLine: "none",
		color: "inherit"
	},
	btnprimary: {
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
});

export const CreateRoom = () => {
	const [createRoomName, setCreateRoomName] = useState("");
	const {githubId}= useContext(UserGithubContext)
	const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)
	const history = useHistory()
	const classes=useStyles();

	const onClickCreateRoom = () => {
		db.collection("room").doc(`${createRoomName}`).set({
			roomName: createRoomName,
			invitePeople: [githubId]
		}).then(() => {
			setCreateRoomName("")
			history.push('/ranking')
		})
		setRoomInfo({
			roomName: createRoomName,
			members: [githubId]
		})
	}

	return (
		<div className={classes.logindark}>
			<div className={classes.logindrakform}>
				<div className={classes.illustrasion}>
					<h3>ルームを作成する</h3>
				</div>
				<TextField className={classes.formcontrol}
					id="room-create"
					label="room name"
					variant="outlined"
					onChange={(e) => setCreateRoomName(e.target.value)}
				/>
				<br />
				<br />
				<div >
					<Button className={classes.btnprimary} variant="contained" onClick={onClickCreateRoom}>作成</Button>
				</div>
			</div>
		</div>
	)
}

