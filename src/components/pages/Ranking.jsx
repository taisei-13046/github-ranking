import React, { useContext, useEffect, useState } from "react";
import { RoomInfoContext, UserGithubContext } from "../../App";
import { Header } from "../organisms/Header";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { RankingTable } from "../organisms/RankingTable";
import { InvitePeople } from "../organisms/InvitePeople"
import dateFormat from "dateformat";

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
    const GetGithubData = async () => {
    if (roomInfo.members) {
      const tmpArray = []
        roomInfo.members.map(async (member) => {
          await axios
            .get(
              `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc`
            )
            .then((res) => {
              console.log(res)
              const oneWeekCommitCount = res.data.items.filter(item => new Date(item.commit.committer.date).getTime() <= oneWeekAgoDate.getTime()).length
              tmpArray.push({
                  githubId: res.data.items[0].author.login,
                  totalCommitCount: res.data.total_count,
                  oneWeekCommitCount: oneWeekCommitCount,
                  lastCommitDate: dateFormat(res.data.items[0].commit.committer.date, "fullDate"),
              })
            })
            .catch((error) => {
              console.log(error);
            });
        });
        setGithubData(tmpArray)
      }
    }
    GetGithubData()
  }, []);

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
