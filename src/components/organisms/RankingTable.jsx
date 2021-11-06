import React, { useContext, useEffect, useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RoomInfoContext } from "../../App";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import dateFormat from "dateformat";

const useStyles = makeStyles({
  tableStyle: {
    height: "100px",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 25,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const RankingTable = () => {
  const { roomInfo } = useContext(RoomInfoContext);
  const [githubData, setGithubData] = useState([]);
  const [repoList, setRepoList] = useState([]);
  const [weeklyCommit, setWeeklyCommit] = useState([]);
  const classes = useStyles();

  var oneWeekAgoDate = new Date();
  oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7);

  //useEffect(() => {
  //  const GetGithubData = async () => {
  //    if (roomInfo.members) {
  //      var tmpArray = [];
  //      var tmpRepoList = [];
  //      await Promise.all(
  //        roomInfo.members.map(async (member) => {
  //          await axios
  //            .get(
  //              `https://api.github.com/users/${member}/repos?client_id=a9590bfb3393ec3b08dc&client_secret=7aed9c8099ca2043c0a1f184eac560972cd7439e`
  //            )
  //            .then((res) => {
  //              console.log(res);
  //              res.data.map((data) => {
  //                tmpRepoList.push({ [member]: data.name });
  //              });
  //            })
  //            .catch((error) => {
  //              console.log(error.response);
  //            });
  //        })
  //      );
  //      setRepoList(tmpRepoList);
  //      var oneWeekCommitCount = 0;
  //      await Promise.all(
  //        repoList.map(async (repo) => {
  //          console.log(Object.keys(repo)[0]);
  //          const repoOwner = Object.keys(repo)[0];
  //          const repoName = repo[repoOwner];
  //          await axios
  //            .get(
  //              `https://api.github.com/repos/${repoOwner}/${repoName}/commits?client_id=a9590bfb3393ec3b08dc&client_secret=7aed9c8099ca2043c0a1f184eac560972cd7439e`
  //            )
  //            .then((res) => {
  //              console.log(res);
  //              //console.log(
  //              //  new Date(res.data[0].commit.author.date).getTime() <=
  //              //    oneWeekAgoDate.getTime()
  //              //);
  //              console.log(oneWeekAgoDate);
  //              oneWeekCommitCount = res.data.filter(
  //                (data) =>
  //                  new Date(data.commit.author.date).getTime() <=
  //                  oneWeekAgoDate.getTime()
  //              ).length;
  //              //console.log(oneWeekCommitCount);
  //            })
  //            .catch((error) => {
  //              console.log(error.response);
  //            });
  //        })
  //      );
  //    }
  //  };
  //  GetGithubData();
  //}, [roomInfo]);

  useEffect(() => {
    const GetGithubData = async () => {
      if (roomInfo.members) {
        var tmpArray = [];
        await Promise.all(
          roomInfo.members.map(async (member) => {
            await axios
              .get(
                `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc?client_id=a9590bfb3393ec3b08dc&client_secret=7aed9c8099ca2043c0a1f184eac560972cd7439e`
              )
              .then((res) => {
                console.log(res);
                const oneWeekCommitCount = res.data.items.filter(
                  (item) =>
                    new Date(item.commit.committer.date).getTime() <=
                    oneWeekAgoDate.getTime()
                ).length;
                tmpArray.push({
                  githubId: res.data.items[0].author.login,
                  totalCommitCount: res.data.total_count,
                  oneWeekCommitCount: oneWeekCommitCount,
                  lastCommitDate: dateFormat(
                    res.data.items[0].commit.committer.date,
                    "fullDate"
                  ),
                });
              })
              .catch((error) => {
                console.log(error.response);
              });
          })
        );
        tmpArray = tmpArray.sort((a, b) => {
          if (a.oneWeekCommitCount > b.oneWeekCommitCount) return -1;
          if (a.oneWeekCommitCount < b.oneWeekCommitCount) return 1;
          return 0;
        });
        setGithubData(tmpArray);
      }
    };
    GetGithubData();
  }, [roomInfo]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>RoomName: {roomInfo.roomName}</StyledTableCell>
              <StyledTableCell align="right">Weekly Commit</StyledTableCell>
              <StyledTableCell align="right">Total Commit</StyledTableCell>
              <StyledTableCell align="right">Last Commit Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {githubData.map((data, index) => (
              <StyledTableRow key={index}>
                {index < 3 ? (
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.tableStyle}
                  >
                    {index + 1}位: {data.githubId}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell component="th" scope="row">
                    {data.githubId}
                  </StyledTableCell>
                )}
                <StyledTableCell align="right">
                  {data.oneWeekCommitCount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.totalCommitCount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.lastCommitDate}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
