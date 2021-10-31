import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {db} from "../../firebase"

import { Header } from "../organisms/Header";
import { RoomInfoContext, UserGithubContext } from "../../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Room = () => {
  const [createRoomName, setCreateRoomName] = useState("");
  const [searchRoomName, setSearchRoomName] = useState("");
  const {githubId, setGithubId} = useContext(UserGithubContext)
  const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)
  const history = useHistory()

  console.log(githubId)

	const onClickCreateRoom = () => {
		db.collection("room").add({
			roomName: createRoomName,
			invitePeople: [githubId]
		}).then(() => {
			setCreateRoomName("")
			//history.push('/ranking')
		})
	}

	const onClickSearchRoom = async () => {
		const docRef = db.collection("room");
		await docRef
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
			  console.log(doc.data())
			  const roomData = doc.data()
			  if (searchRoomName === roomData.roomName && roomData.invitePeople.includes(githubId)) {
				  setRoomInfo({
					roomName: roomData.roomName,
					member: roomData.invitePeople
				  })
				history.push('/ranking')
			  }
			});
		})
	}

  return (
    <div>
      <Header />
      <h3>ルームを検索する</h3>
      <TextField id="room-search" label="Outlined" variant="outlined" onChange={(e) => setSearchRoomName(e.target.value)} />
      <Button variant="contained" onClick={onClickSearchRoom}>入室</Button>
      <h3>ルームを作成する</h3>
      <TextField
        id="room-create"
        label="Outlined"
        variant="outlined"
        onChange={(e) => setCreateRoomName(e.target.value)}
      />
      <Button variant="contained" onClick={onClickCreateRoom}>作成</Button>
    </div>
  );
};
