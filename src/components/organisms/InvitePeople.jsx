import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import React, { useContext, useState } from "react";
import { RoomInfoContext } from "../../App";
import { db } from "../../firebase";

const useStyle = makeStyles({
	textAndButton: {
		textAlign: "center"
	},
	textStyle: {
		marginBottom: "5px"
	},
	memberList: {
		marginTop: "10px"
	}
})

export const InvitePeople = () => {
  const [githubData, setGithubData] = useState([]);
  const [invitePeopleName, setInvitePeopleName] = useState("");
  const { roomInfo, setRoomInfo } = useContext(RoomInfoContext);
  const classes = useStyle()

  const onClickInvitePeople = async () => {
    setRoomInfo({
      roomName: roomInfo.roomName,
      members: roomInfo.members.push(invitePeopleName),
    });
    const docRef = db.collection("room").doc(`${roomInfo.roomName}`);
    await docRef.set({
      roomName: roomInfo.roomName,
      invitePeople: roomInfo.members,
    });
    setInvitePeopleName("");
    console.log(githubData);
  };

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
      <Button variant="contained" onClick={onClickInvitePeople}>
        招待
      </Button>
	  <h3>Member</h3>
	  {
      roomInfo.members.map((member) => [
        <div className={classes.memberList}>{member}</div>
      ])
    }
    </div>
  );
};
