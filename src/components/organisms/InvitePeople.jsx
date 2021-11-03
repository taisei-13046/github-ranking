import { Alert, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import React, { useContext, useEffect, useState } from "react";
import { RoomInfoContext } from "../../App";
import { db } from "../../firebase";

const useStyle = makeStyles({
	textAndButton: {
		textAlign: "center"
	},
	textStyle: {
		marginBottom: "5px"
	},
	memberListDiv: {
		marginTop: "10px",
    color: "black"
	},
	memberListButton: {
    contrastText: "black"
	}
})

export const InvitePeople = () => {
  const classes = useStyle()
  const [invitePeopleName, setInvitePeopleName] = useState("")
	const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)
  const [deleteAlertName, setDeleteAlertName] = useState("")

  const onClickInvite = () => {
    roomInfo.members.push(invitePeopleName)
    setRoomInfo({
      roomName: roomInfo.roomName,
			members: roomInfo.members
    })
    const docRef = db.collection("room").doc(`${roomInfo.roomName}`);
    docRef.set({
      roomName: roomInfo.roomName,
      invitePeople: roomInfo.members,
    });
    setInvitePeopleName("");
  }

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
    <div className={classes.textAndButton}>
      <h2>Invite People</h2>
		<div className={classes.textStyle}>
			<TextField
				id="invite-member-search"
				label="github-id"
				variant="outlined"
        value={invitePeopleName}
        onChange={(e) => setInvitePeopleName(e.target.value)}
			/>
		</div>
	  <br />
      <Button variant="contained" onClick={onClickInvite}>
        招待
      </Button>
	  <h3>Member</h3>
    {deleteAlertName ? (
      <Alert severity="success" color="info">
        <div>do you want to delete this member?</div>
        <Button size="small" onClick={onClickDeleteYes}>Yes</Button>
        <Button size="small" onClick={() => setDeleteAlertName("")} >No</Button>
      </Alert>
    ): (
      <></>
    )}
    {roomInfo.members.map((member) => (
      <div className={classes.memberListDiv}>
        <Button variant="outlined" className={classes.memberListButton} onClick={() => setDeleteAlertName(member)} >{member}</Button>
      </div>
    ))}
    </div>
  );
};
