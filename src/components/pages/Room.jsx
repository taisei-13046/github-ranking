import React from "react";
import { Header } from "../organisms/Header";
import {CreateRoom} from "../moleclues/CreateRoom"
import {SearchRoom} from "../moleclues/SearchRoom"
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { RoomList } from "../organisms/RoomList";

const useStyles = makeStyles({
  backgraound: {
    height: "100%",
		background: "#e9f9ff",
		backgroundSize: "cover",
  }
})

export const Room = () => {
  const classes = useStyles()

  return (
    <>
      <Header />
      <div className={classes.backgraound}>
        <Grid container >
          <Grid item xs={7} >
              <CreateRoom />
              <SearchRoom />
          </Grid>
          <Grid item xs={5}>
            <RoomList />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
