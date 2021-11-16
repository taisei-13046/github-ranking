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
import gold from "../../img/gold.png"
import silber from "../../img/silber.png"
import brown from "../../img/brown.png"

const useStyles = makeStyles({
  tableStyle: {
    height: "100px",
  },
  imgSize: {
    width: "35px",
    height: "35px",
    marginRight: "5px",
    marginBottom: "7px"
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
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

  var current = new Date();
  var first = current.getDate() - current.getDay();
  var oneWeekAgoDate = new Date(current.setDate(first))

  useEffect(() => {
    const GetGithubData = async () => {
      if (roomInfo.members) {
        var tmpArray = [];
        await Promise.all(
          roomInfo.members.map(async (member) => {
            await axios
              .get(
                `https://api.github.com/search/commits?q=author:${member}&sort=committer-date&order=desc?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_SECRET_KEY}`
              )
              .then(async (res) => {
                const oneWeekCommitCount = await res.data.items.filter(
                  (item) =>
                    new Date(item.commit.committer.date).getTime() >=
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
      <h1>{dateFormat(oneWeekAgoDate, "paddedShortDate")} ~</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>RoomName: {roomInfo.roomName}</StyledTableCell>
              <StyledTableCell align="right">
                Weekly Commit(Max 30)
              </StyledTableCell>
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
                  {index === 0 && <img src={gold} className={classes.imgSize} />}
                  {index === 1 && <img src={silber} className={classes.imgSize} />}
                  {index === 2 && <img src={brown} className={classes.imgSize} />}
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
