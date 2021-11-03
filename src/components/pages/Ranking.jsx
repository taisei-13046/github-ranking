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

  var oneWeekAgoDate = new Date()
  oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7)

export const Ranking = () => {
  const [githubData, setGithubData] = useState([]);
  const { roomInfo } = useContext(RoomInfoContext);
  const {githubId} = useContext(UserGithubContext)
  const classes = useStyles()


  useEffect(() => {
    const GetGithubData = () => {
    if (roomInfo.members) {
        roomInfo.members.map((member) => {
          axios
            .get(
              `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc?per_page=100`
            )
            .then((res) => {
              console.log('hello')
              console.log(res.data)
              //console.log(oneWeekAgoDate)
              //const oneWeekCommitCount = await res.data.items.filter(item => new Date(item.commit.committer.date).getTime() <= oneWeekAgoDate.getTime()).length
              //console.log(oneWeekCommitCount)
              setGithubData([
                {
                  githubID: res.data.items[0].commit.committer.name,
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
      }
    }
    GetGithubData()
  }, [])


              //setGithubData([
              //  {
              //    githubID: githubId,
              //    totalCommitCount: res.data.total_count,
              //    //oneWeekCommitCount: oneWeekCommitCount,
              //    lastCommitDate: res.data.items[0].commit.committer.date,
              //  },
              //  ...githubData
              //])

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
