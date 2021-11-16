import { Button, createMuiTheme, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { RoomInfoContext, UserGithubContext } from "../../App";
import { db } from "../../firebase";
import { DeleteMemberAlert } from "../moleclues/DeleteMemberAlert";

const useStyle = makeStyles({
  textAndButton: {
    textAlign: "center",
  },
  textWidth: {
    width: "225px"
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
  superUserListButton: {
    contrastText: "black",
    width: "200px",
    height: "50px",
    color: "red",
  },
  memberListButton: {
    contrastText: "black",
    width: "200px",
    height: "50px"
  },
  memberStyle: {
    marginTop: "25px",
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
  const { githubId } = useContext(UserGithubContext);
  const [invitePeopleName, setInvitePeopleName] = useState("");
  const { roomInfo, setRoomInfo } = useContext(RoomInfoContext);
  const [deleteAlertName, setDeleteAlertName] = useState("");

  const onClickInvite = () => {
    if (roomInfo.superUser === githubId) {
      roomInfo.members.push(invitePeopleName);
      setRoomInfo({
        roomName: roomInfo.roomName,
        superUser: roomInfo.superUser,
        members: roomInfo.members,
      });
      const docRef = db.collection("room").doc(`${roomInfo.roomName}`);
      docRef.set({
        roomName: roomInfo.roomName,
        superUser: roomInfo.superUser,
        members: roomInfo.members,
      });
      setInvitePeopleName("");
    }else{
      alert('管理者以外はinvite権限はありません')
      setInvitePeopleName("");
    }
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
          className={classes.textWidth}
          onChange={(e) => setInvitePeopleName(e.target.value)}
        />
      </div>
      <br />
      <Button size="large" variant="contained" onClick={onClickInvite}>
        Invite
      </Button>
      <h2 className={classes.memberStyle}>Host</h2>
      <div className={classes.memberWhole}>
        <Button
          variant="outlined"
          className={classes.superUserListButton}
          theme={customTheme}
          color="error"
        >
          {roomInfo.superUser}
        </Button>
      </div>
      <h2 className={classes.memberStyle}>Member</h2>
      {deleteAlertName ? (
        <DeleteMemberAlert
          deleteAlertName={deleteAlertName}
          setDeleteAlertName={setDeleteAlertName}
        />
      ) : (
        <></>
      )}
      <div className={classes.memberWhole}>
        {roomInfo.members.map((member) => (
          <div className={classes.memberListDiv}>
            <Button
              variant="outlined"
              key={member}
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
