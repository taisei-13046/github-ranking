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

  var oneWeekAgoDate = new Date()
  oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7)

  useEffect(() => {
    const GetGithubData = async () => {
    if (roomInfo.members) {
        roomInfo.members.map( async (member) => {
          axios
            .get(
              `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc?per_page=100`
            )
            .then(async (res) => {
              console.log(res);
              //console.log(res.data.items[0].commit.committer.date)
              console.log(new Date(res.data.items[0].commit.committer.date).getTime() >= oneWeekAgoDate.getTime())
              console.log(res.data.items)
              console.log(oneWeekAgoDate)
              //const oneWeekCommitCount = await res.data.items.filter(item => new Date(item.commit.committer.date).getTime() <= oneWeekAgoDate.getTime()).length
              //console.log(oneWeekCommitCount)
              setGithubData([
                {
                  githubID: githubId,
                  totalCommitCount: res.data.total_count,
                  //oneWeekCommitCount: oneWeekCommitCount,
                  lastCommitDate: res.data.items[0].commit.committer.date,
                },
                ...githubData
              ])
            })
            .catch((error) => {
              console.log(error);
            });
        });
        GetGithubData()
      }
    }
  }, []);


  return (
    <div>
      <Header />
      <Grid container >
        <Grid item xs={10} >
          <div className={classes.rankingTable}>
            <RankingTable />
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
