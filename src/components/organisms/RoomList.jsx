import { Button, createMuiTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { UserGithubContext } from "../../App";
import { db } from "../../firebase";
import { DeleteRoom } from "../moleclues/DeleteRoom";
import { RoomAlert } from "../moleclues/RoomAlert";


const useStyles = makeStyles({
  roomList: {
    marginTop: "50px",
    textAlign: "center"
  },
  eachRoom: {
    marginTop: "25px",
  },
  roomTitle: {
    marginButtom: "5px",
    fontSize: "30px"
  },
  buttonStyle: {
    width: "300px",
    height: "60px",
  },
});

const customTheme = createMuiTheme({
  typography: {
      // fontFamily: "Indie Flower",
      fontSize: 25,
      button: {
          textTransform: "none"
      }
  }
});

export const RoomList = () => {

  const { githubId } = useContext(UserGithubContext);
  const classes = useStyles();
  const [roomList, setRoomList] = useState([]);
  const [selectedRoomName, setSelectedRoomName] = useState("")
  const [alertOpenFlag, setAlertOpenFlag] = useState(false)
  const [confirmAlert, setConfirmAlert] = useState(false)

  useEffect(() => {
    const GetRoomList = async () => {
      var tmpArray = [];
      const docRef = db.collection("room");
      await docRef.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          const roomData = doc.data();
          if (roomData.invitePeople.includes(githubId)) {
            tmpArray.push(roomData.roomName);
          }
        });
      });
      setRoomList(tmpArray);
    };
    GetRoomList();
  }, []);

  return (
    <div className={classes.roomList}>
      <h4 className={classes.roomTitle}>Your Room</h4>
      {alertOpenFlag && !confirmAlert ? (
      <RoomAlert setConfirmAlert={setConfirmAlert} setAlertOpenFlag={setAlertOpenFlag} selectedRoomName={selectedRoomName} setSelectedRoomName={setSelectedRoomName} setRoomList={setRoomList}/>
      ): (
      <></>
      )}
      {confirmAlert ? (
        <DeleteRoom setConfirmAlert={setConfirmAlert} selectedRoomName={selectedRoomName} setSelectedRoomName={setSelectedRoomName} setRoomList={setRoomList} roomList={roomList} />
      ): (
        <></>
      )}
      {roomList.map((room, index) => (
        <>
          <div className={classes.eachRoom}>
            <Button
              theme={customTheme}
              variant="outlined"
              key={index}
              className={classes.buttonStyle}
              style={{ color: "#1976d2", backgroundColor: "white" }}
              onClick={() => {
                setSelectedRoomName(room)
                setAlertOpenFlag(true)
              }}
            >
              {room}
            </Button>
          </div>
        </>
      ))}
    </div>
  );
};
