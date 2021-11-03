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
  const classes = useStyles()
	const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)
  const [githubData, setGithubData] = useState([]);

  var oneWeekAgoDate = new Date()
  oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7)

  useEffect(() => {
    const GetGithubData = () => {
    if (roomInfo.members) {
      const tmpArray = []
        roomInfo.members.map(async (member) => {
          await axios
            .get(
              `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc`
            )
            .then(async (res) => {
              console.log(res)
              const oneWeekCommitCount = await res.data.items.filter(item => new Date(item.commit.committer.date).getTime() <= oneWeekAgoDate.getTime()).length
              tmpArray.push({
                  githubID: res.data.items[0].commit.committer.name,
                  totalCommitCount: res.data.total_count,
                  oneWeekCommitCount: oneWeekCommitCount,
                  lastCommitDate: res.data.items[0].commit.committer.date,
              })
            })
            .catch((error) => {
              console.log(error);
            });
        });
        console.log(tmpArray)
        setGithubData(tmpArray)
      }
    }
    GetGithubData()
  }, []);

  console.log(githubData)

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
