import React, { useContext, useEffect, useState } from "react";
import { RoomInfoContext, UserGithubContext } from "../../App";
import { Header } from "../organisms/Header";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { RankingTable } from "../organisms/RankingTable";
import { InvitePeople } from "../organisms/InvitePeople"

const useStyles = makeStyles({
  rankingTable: {
    margin: "30px",
  },
  inviteTextandButton: {
    marginTop: "30px",
  }
})

export const Ranking = () => {
  const [githubData, setGithubData] = useState([]);
  const { roomInfo } = useContext(RoomInfoContext);
  const {githubId} = useContext(UserGithubContext)
  const classes = useStyles()

  return (
    <div>
      <Header />
      <Grid container >
        <Grid item xs={10} >
          <div className={classes.rankingTable}>
            <RankingTable githubData={githubData}/>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.inviteTextandButton}>
            <InvitePeople />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
