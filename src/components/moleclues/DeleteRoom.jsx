import { Alert, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react'
import { UserGithubContext } from '../../App';
import { db } from "../../firebase"

const useStyles = makeStyles({
	root: {
	  margin: "0 auto",
	},
	alertBox: {
	  margin: "0 auto",
	  width: "500px",
	  backgroundColor: "#fff",
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center",
	},
	buttonLeft: {
	  display: "inline-block",
	  marginRight: "5px"
	},
	buttonRight: {
	  display: "inline-block",
	  marginLeft: "5px"
	}
});

export const DeleteRoom = (props) => {
	const {setConfirmAlert, selectedRoomName, setSelectedRoomName, setRoomList } = props;
	const { githubId } = useContext(UserGithubContext);
	const classes = useStyles()

	const onClickDeleteYes = async () => {
		db.collection("room")
			.doc(`${selectedRoomName}`)
			.delete()
			.then(() => {
				setSelectedRoomName("");
			});
		var tmpArray = [];
		const docRef = db.collection("room");
		await docRef.get().then((querySnapshot) => {
			querySnapshot.docs.map((doc) => {
			const roomData = doc.data();
			if (roomData.invitePeople.includes(githubId)) {
				tmpArray.push(roomData.roomName);
			}
			});
		});
		setRoomList(tmpArray);
		setConfirmAlert(false)
	}

	return (
		<div className={classes.root}>
		<Alert icon={false} variant="outlined" severity="info" className={classes.alertBox}>
			<h5>Are you sure you want to delete <b>{selectedRoomName}</b>?</h5>
			<div className={classes.buttonLeft}>
			<Button size="large" variant="outlined" onClick={onClickDeleteYes}>
				Yes
			</Button>
			</div>
			<div className={classes.buttonRight}>
			<Button size="large" variant="outlined" onClick={() => setConfirmAlert(false)}>
				No
			</Button>
			</div>
		</Alert>
		</div>
	)
}

