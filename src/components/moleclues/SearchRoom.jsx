import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material'
import {db} from "../../firebase"
import { RoomInfoContext, UserGithubContext } from '../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const SearchRoom = () => {
  const [searchRoomName, setSearchRoomName] = useState("");
  const {githubId} = useContext(UserGithubContext)
  const {setRoomInfo} = useContext(RoomInfoContext)

  const history = useHistory()
	const onClickSearchRoom = async () => {
		const docRef = db.collection("room");
		await docRef
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
			  const roomData = doc.data()
			  if (searchRoomName === roomData.roomName && roomData.invitePeople.includes(githubId)) {
				  setRoomInfo({
					roomName: roomData.roomName,
					members: roomData.invitePeople
				  })
				history.push('/ranking')
			  }
			});
		})
	}

	return (
		<>
			<h3>ルームを検索する</h3>
			<TextField id="room-search" label="Outlined" variant="outlined" onChange={(e) => setSearchRoomName(e.target.value)} />
			<Button variant="contained" onClick={onClickSearchRoom}>入室</Button>
		</>
	)
}
