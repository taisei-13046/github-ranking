import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserGithubContext } from "../../App";
import { RoomInfoContext } from "../../App";
import { db } from "../../firebase";

const useStyles = makeStyles({
  roomList: {
    marginTop: "100px",
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
  },
});

export const RoomList = () => {
  const { githubId } = useContext(UserGithubContext);
  const classes = useStyles();
  const [roomList, setRoomList] = useState([]);
  const { setRoomInfo } = useContext(RoomInfoContext);
  const history = useHistory()

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

  const onClickByList = async (room) => {
    const docRef = db.collection("room");
    await docRef.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const roomData = doc.data();
        if (
          room === roomData.roomName &&
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

  console.log(roomList);

  return (
    <div className={classes.roomList}>
      <h2 className={classes.roomTitle}>Your Room</h2>
      {roomList.map((room, index) => (
        <>
          <div className={classes.eachRoom}>
            <Button
              variant="outlined"
              key={index}
              className={classes.buttonStyle}
              onClick={() => onClickByList(room)}
            >
              {room}
            </Button>
          </div>
        </>
      ))}
    </div>
  );
};
