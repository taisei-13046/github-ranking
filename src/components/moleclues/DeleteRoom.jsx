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

	const onClickDeleteYes = () => {
		db.collection("room")
			.doc(`${selectedRoomName}`)
			.delete()
			.then(() => {
				setSelectedRoomName("");
			});
		var tmpArray = [];
		const docRef = db.collection("room");
		docRef.get().then((querySnapshot) => {
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
		<div>
			<Alert severity="success" color="info">
				<div>do you want to delete {selectedRoomName}?</div>
				<Button size="small" onClick={onClickDeleteYes}>Yes</Button>
				<Button size="small" onClick={() => setConfirmAlert(false)} >No</Button>
			</Alert>
		</div>
	)
}

