import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { db } from "../../firebase";
import { RoomInfoContext, UserGithubContext } from "../../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { makeStyles, createStyles, Theme } from "@mui/styles";

const useStyles = makeStyles({
  logindark: {
    textAlign: "center",
    height: "300px",
    background: "#e9f9ff",
    backgroundSize: "cover",
    position: "relative",
  },
  logindrakform: {
    maxWidth: "320px",
    width: "90%",
    backgroundColor: "#ffff",
    padding: "40px",
    borderRadius: "4px",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    top: "25%",
    left: "50%",
    color: "#ff9100",
    boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
  },
  illustrasion: {
    textalign: "center",
    padding: "15px 0 20px",
    fontSize: "100px",
    color: "#000000",
  },
  formcontrol: {
    background: "#fff",
    border: "none",
    borderBottom: "1px solid #434a52",
    borderRadius: "0",
    boxShadow: "none",
    outLine: "none",
    color: "inherit",
  },
  btnprimary: {
    background: "#214a80",
    border: "none",
    borderRadius: "4px",
    padding: "11px",
    boxShadow: "none",
    marginTop: "26px",
    textShadow: "none",
    outline: "none",
    "&:hover": {
      background: "#214a80",
      outLine: "none",
    },
    "&:active": {
      background: "#214a80",
      outLine: "none",
      transform: "translateY(1px)",
    },
  },
});

export const SearchRoom = (props) => {
  const [searchRoomName, setSearchRoomName] = useState("");
  const { githubId } = useContext(UserGithubContext);
  const { setRoomInfo } = useContext(RoomInfoContext);
  const classes = useStyles();

  const history = useHistory();
  const onClickSearchRoom = async () => {
    const docRef = db.collection("room");
    await docRef.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const roomData = doc.data();
        if (
          searchRoomName === roomData.roomName &&
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

  return (
    <div className={classes.logindark}>
      <div className={classes.logindrakform}>
        <div className={classes.illustrasion}>
          <h3>ルームを検索する</h3>
        </div>
        <TextField
          className={classes.formcontrol}
          id="room-search"
          label="room name"
          variant="outlined"
          onChange={(e) => setSearchRoomName(e.target.value)}
        />
        <br />
        <br />
        <div>
          <Button
            className={classes.btnprimary}
            variant="contained"
            onClick={onClickSearchRoom}
          >
            入室
          </Button>
        </div>
      </div>
    </div>
  );
};
