import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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
    height: "75px",
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
  const classes = useStyles();

  var oneWeekAgoDate = new Date();
  oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7);

  useEffect(() => {
    const GetGithubData = async () => {
      if (roomInfo.members) {
        const tmpArray = [];
        await Promise.all(roomInfo.members.map(async (member) => {
          await axios
            .get(
              `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc`
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
              console.log(error);
            });
        }));
        setGithubData(tmpArray);
      }
    };
    GetGithubData();
  }, [roomInfo.members]);

  //if (githubData.oneWeekCommitCount) {
  //  githubData = githubData.oneWeekCommitCount.sort((a, b) => b - a)
  //  console.log(githubData.oneWeekCommitCount.sort((a, b) => b - a))
  //}
  console.log(githubData);
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
              <StyledTableRow key={data.githubId}>
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