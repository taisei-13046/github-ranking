import React, { useContext } from "react";
import { Alert, Button } from "@mui/material";
import { db } from "../../firebase"
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
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export const RoomAlert = (props) => {
  const { selectedRoomName, setSelectedRoomName } = props;
  const { githubId } = useContext(UserGithubContext);
  const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)
  const classes = useStyles()

  const history = useHistory()

  const onClickEnterRoom = async () => {
    const docRef = db.collection("room");
    await docRef.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const roomData = doc.data();
        if (
          selectedRoomName === roomData.roomName &&
          roomData.invitePeople.includes(githubId)
        ) {
          setRoomInfo({
            roomName: roomData.roomName,
            members: roomData.invitePeople,
          });
          history.push("/ranking");
        }
      });
    });
  };

  const onClickDeleteRoom = () => {
	  db.collection("room").doc(`${selectedRoomName}`)
	  .delete()
	  .then(() => {
		  setSelectedRoomName("")
	  })
  };

  return (
    <div className={classes.root}>
      <Alert icon={false} variant="outlined" color="default" className={classes.alertBox}>
		<h5>{selectedRoomName}</h5>
        <Button size="large" onClick={onClickEnterRoom}>
          Enter
        </Button>
        <Button size="large" onClick={onClickDeleteRoom}>
          Delete
        </Button>
      </Alert>
    </div>
  );
};
