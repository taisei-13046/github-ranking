import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { db } from "../../firebase"
import { RoomInfoContext, UserGithubContext } from '../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const CreateRoom = () => {
	const [createRoomName, setCreateRoomName] = useState("");
	const {githubId}= useContext(UserGithubContext)
	const {setRoomInfo} = useContext(RoomInfoContext)
	const history = useHistory()

	const onClickCreateRoom = () => {
		db.collection("room").add({
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
		<>
			<h3>ルームを作成する</h3>
			<TextField
			id="room-create"
			label="Outlined"
			variant="outlined"
			onChange={(e) => setCreateRoomName(e.target.value)}
			/>
			<Button variant="contained" onClick={onClickCreateRoom}>作成</Button>
		</>
	)
}

