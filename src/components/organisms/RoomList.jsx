import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserGithubContext } from "../../App";
import { RoomInfoContext } from "../../App";
import { db } from "../../firebase";
import { RoomAlert } from "../moleclues/RoomAlert";


const useStyles = makeStyles({
  roomList: {
    height:"100vh",
    marginTop: "100px",
	textAlign: "center"
  },
  eachRoom: {
    marginTop: "10px",
  },
  roomTitle: {
    marginButtom: "5px",
  },
  buttonStyle: {
    backgroundColor: "white",
    width: "200px",
    height: "50px",
    color: "white"
  },
});

export const RoomList = () => {

  const { githubId } = useContext(UserGithubContext);
  const classes = useStyles();
  const [roomList, setRoomList] = useState([]);
  const [selectedRoomName, setSelectedRoomName] = useState("")

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
    console.log('hello')
  }, []);

  return (
    <div className={classes.roomList}>
      <h2 className={classes.roomTitle}>Your Room</h2>
		{selectedRoomName ? (
		<RoomAlert selectedRoomName={selectedRoomName} setSelectedRoomName={setSelectedRoomName} setRoomList={setRoomList}/>
		): (
		<></>
		)}
      {roomList.map((room, index) => (
        <>
          <div className={classes.eachRoom}>
            <Button
              variant="contained"
              key={index}
              className={classes.buttonStyle}
              style={{ color: "#1976d2", backgroundColor: "white" }}
              onClick={() => setSelectedRoomName(room)}
            >
              {room}
            </Button>
          </div>
        </>
      ))}
    </div>
  );
};
