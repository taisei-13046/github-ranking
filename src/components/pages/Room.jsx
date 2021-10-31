import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserEmailContext } from "../../App";

export const Room = () => {
  const userEmail = useContext(UserEmailContext);
  return (
    <div>
      <h3>ルームを検索する</h3>
      <TextField id="room-search" label="Outlined" variant="outlined" />
      <Button variant="contained">入室</Button>
      <h3>ルームを作成する</h3>
      <TextField id="room-create" label="Outlined" variant="outlined" />
      <Button variant="contained">作成</Button>
    </div>
  );
};
