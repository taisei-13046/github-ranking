import React, { useContext } from "react";
import { Alert, Button } from "@mui/material";
import { db } from "../../firebase";
import { RoomInfoContext, UserGithubContext } from "../../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { makeStyles } from "@mui/styles";

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

export const RoomAlert = (props) => {
  const {setConfirmAlert, setAlertOpenFlag, selectedRoomName } = props;
  const { githubId } = useContext(UserGithubContext);
  const { setRoomInfo } = useContext(RoomInfoContext);
  const classes = useStyles();

  const history = useHistory();

  const onClickEnterRoom = async () => {
    const docRef = db.collection("room");
    await docRef.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const roomData = doc.data();
        if (
          selectedRoomName === roomData.roomName &&
          roomData.members.includes(githubId)
        ) {
          setRoomInfo({
            roomName: roomData.roomName,
            superUser: roomData.superUser,
            members: roomData.members,
          });
          history.push("/ranking");
        }
      });
    });
  };

  const onClickDelete = () => {
    setAlertOpenFlag(false)
    setConfirmAlert(true)
  }

  return (
    <div className={classes.root}>
      <Alert icon={false} variant="outlined" severity="info" className={classes.alertBox}>
        <h3>{selectedRoomName}</h3>
        <div className={classes.buttonLeft}>
          <Button size="large" variant="outlined" onClick={onClickEnterRoom}>
            Enter
          </Button>
        </div>
        <div className={classes.buttonRight}>
          <Button size="large" variant="outlined" onClick={onClickDelete}>
            Delete
          </Button>
        </div>
      </Alert>
    </div>
  );
};
