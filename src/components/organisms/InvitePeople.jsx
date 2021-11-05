import { Alert, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import React, { useContext, useEffect, useState } from "react";
import { RoomInfoContext } from "../../App";
import { db } from "../../firebase";
import { DeleteMemberAlert } from "../moleclues/DeleteMemberAlert";

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
	},
  memberStyle: {
    marginTop: "100px"
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

  console.log(roomInfo)

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
        Invite
      </Button>
	  <h2 className={classes.memberStyle}>Member</h2>
    {deleteAlertName ? (
      <DeleteMemberAlert deleteAlertName={deleteAlertName} setDeleteAlertName={setDeleteAlertName} />
    ): (
      <></>
    )}
    {roomInfo.members.map((member, index) => (
      <div className={classes.memberListDiv}>
        <Button variant="outlined" key={index} className={classes.memberListButton} onClick={() => setDeleteAlertName(member)} >{member}</Button>
      </div>
    ))}
    </div>
  );
};
