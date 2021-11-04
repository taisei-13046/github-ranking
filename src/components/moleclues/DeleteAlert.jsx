import { Alert, Button } from '@mui/material'
import React, { useContext } from 'react'
import { RoomInfoContext } from '../../App'
import { db } from "../../firebase"

export const DeleteAlert = (props) => {
	const {deleteAlertName, setDeleteAlertName} = props
	const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)

	const onClickDeleteYes = () => {
		const deleteNameIndex = roomInfo.members.indexOf(deleteAlertName)
		roomInfo.members.splice(deleteNameIndex, 1)
		setRoomInfo({
			roomName: roomInfo.roomName,
			members: roomInfo.members
		})
		const docRef = db.collection("room").doc(`${roomInfo.roomName}`);
		docRef.set({
			roomName: roomInfo.roomName,
			invitePeople: roomInfo.members,
		});
		setDeleteAlertName("")
	}

	return (
		<div>
			<Alert severity="success" color="info">
				<div>do you want to delete {deleteAlertName}?</div>
				<Button size="small" onClick={onClickDeleteYes}>Yes</Button>
				<Button size="small" onClick={() => setDeleteAlertName("")} >No</Button>
			</Alert>
		</div>
	)
}

