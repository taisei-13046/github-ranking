import React from "react";
import { Header } from "../organisms/Header";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { RankingTable } from "../organisms/RankingTable";
import { InvitePeople } from "../organisms/InvitePeople"

const useStyles = makeStyles({
  rankingTable: {
    margin: "30px",
  },
  inviteTextandButton: {
    marginTop: "75px",
  }
})


export const Ranking = () => {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <Grid container >
        <Grid item xs={9} >
          <div className={classes.rankingTable}>
            <RankingTable />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.inviteTextandButton}>
            <InvitePeople />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
