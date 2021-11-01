import React, { useContext, useEffect, useState } from "react";
import { RoomInfoContext } from "../../App";
import { Header } from "../organisms/Header";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import {db} from "../../firebase"

export const Ranking = () => {
  const [allCommitCount, setAllCommitCount] = useState({});
  const [invitePeopleName, setInvitePeopleName] = useState("");
  const { roomInfo, setRoomInfo } = useContext(RoomInfoContext);

  useEffect(() => {
	if (roomInfo.members) {
    roomInfo.members.map((member) => {
      console.log(member);
      axios
        .get(
          `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc?per_page=100`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.total_count);
          setAllCommitCount({
            ...allCommitCount,
            member: res.data.total_count,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
	}
  }, []);

  const onClickInvitePeople = async () => {
	setRoomInfo({
		roomName: roomInfo.roomName,
		members: roomInfo.members.push(invitePeopleName)
	})
	const docRef = db.collection("room").doc(`${roomInfo.roomName}`);
	await docRef.set({
		roomName: roomInfo.roomName,
		invitePeople: roomInfo.members
	})
  }

  return (
    <div>
      <Header />
      <TextField
        id="invite-member-search"
        label="Outlined"
        variant="outlined"
		value={invitePeopleName}
        onChange={(e) => setInvitePeopleName(e.target.value)}
      />
      <Button variant="contained" onClick={onClickInvitePeople}>招待</Button>
    </div>
  );
};
