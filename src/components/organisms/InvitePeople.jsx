import { Button, createMuiTheme, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { RoomInfoContext } from "../../App";
import { db } from "../../firebase";
import { DeleteMemberAlert } from "../moleclues/DeleteMemberAlert";

const useStyle = makeStyles({
  textAndButton: {
    textAlign: "center",
  },
  textWidth: {
    width: "250px"
  },
  textStyle: {
    marginTop: "30px",
    marginBottom: "5px",
  },
  memberWhole: {
    marginTop: "20px"
  },
  memberListDiv: {
    marginTop: "15px",
    color: "black",
  },
  memberListButton: {
    contrastText: "black",
    width: "200px",
    height: "50px"
  },
  memberStyle: {
    marginTop: "100px",
  },
});

const customTheme = createMuiTheme({
  typography: {
      // fontFamily: "Indie Flower",
      fontSize: 18,
      button: {
          textTransform: "none"
      }
  }
});

export const InvitePeople = () => {
  const classes = useStyle();
  const [invitePeopleName, setInvitePeopleName] = useState("");
  const { roomInfo, setRoomInfo } = useContext(RoomInfoContext);
  const [deleteAlertName, setDeleteAlertName] = useState("");

  const onClickInvite = () => {
    roomInfo.members.push(invitePeopleName);
    setRoomInfo({
      roomName: roomInfo.roomName,
      members: roomInfo.members,
    });
    const docRef = db.collection("room").doc(`${roomInfo.roomName}`);
    docRef.set({
      roomName: roomInfo.roomName,
      invitePeople: roomInfo.members,
    });
    setInvitePeopleName("");
  };

  console.log(roomInfo);

  return (
    <div className={classes.textAndButton}>
      <h1>Invite People</h1>
      <div className={classes.textStyle}>
        <TextField
          id="invite-member-search"
          label="github-id"
          variant="outlined"
          value={invitePeopleName}
          className={classes.textWidth}
          onChange={(e) => setInvitePeopleName(e.target.value)}
        />
      </div>
      <br />
      <Button size="large" variant="contained" onClick={onClickInvite}>
        Invite
      </Button>
      <h1 className={classes.memberStyle}>Member</h1>
      {deleteAlertName ? (
        <DeleteMemberAlert
          deleteAlertName={deleteAlertName}
          setDeleteAlertName={setDeleteAlertName}
        />
      ) : (
        <></>
      )}
      <div className={classes.memberWhole}>
        {roomInfo.members.map((member, index) => (
          <div className={classes.memberListDiv}>
            <Button
              variant="outlined"
              key={index}
              className={classes.memberListButton}
              onClick={() => setDeleteAlertName(member)}
              theme={customTheme}
            >
              {member}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
