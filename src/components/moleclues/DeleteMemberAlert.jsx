import { Alert, Button } from "@mui/material";
import React, { useContext } from "react";
import { RoomInfoContext, UserGithubContext  } from "../../App";
import { db } from "../../firebase";

export const DeleteMemberAlert = (props) => {
  const { deleteAlertName, setDeleteAlertName } = props;
  const { githubId } = useContext(UserGithubContext);
  const { roomInfo, setRoomInfo } = useContext(RoomInfoContext);

  const onClickDeleteYes = () => {
    if (roomInfo.superUser === githubId) {
      const deleteNameIndex = roomInfo.members.indexOf(deleteAlertName);
      roomInfo.members.splice(deleteNameIndex, 1);
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
      setDeleteAlertName("");
    }else{
		alert("管理者以外はメンバーを退会させることはできません")
		setDeleteAlertName("");
	}
  };

  return (
    <div>
      <Alert severity="success" color="info">
        <div>do you want to delete {deleteAlertName}?</div>
        <Button size="small" onClick={onClickDeleteYes}>
          Yes
        </Button>
        <Button size="small" onClick={() => setDeleteAlertName("")}>
          No
        </Button>
      </Alert>
    </div>
  );
};
