import React, {useContext} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RoomInfoContext, UserGithubContext } from "../../App";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const RankingTable = (props) => {
	const {roomInfo, setRoomInfo} = useContext(RoomInfoContext)
  const {githubData} = props

  console.log(githubData)
  if (githubData.oneWeekCommitCount) {
    githubData = githubData.oneWeekCommitCount.sort((a, b) => b - a)
    console.log(githubData.oneWeekCommitCount.sort((a, b) => b - a))
  }
  console.log(githubData)
	return (
		<div>
			<TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>roomName: {roomInfo.roomName}</StyledTableCell>
                  <StyledTableCell align="right">totalCommit</StyledTableCell>
                  <StyledTableCell align="right">weeklyCommit</StyledTableCell>
                  <StyledTableCell align="right">lastCommitDate</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {githubData.map((data, index) => (
                  <StyledTableRow key={data.githubId}>
                    {index < 3 ? (
                      <StyledTableCell component="th" scope="row">
                        {index+1}位: {data.githubId}
                      </StyledTableCell>
                    ): (
                      <StyledTableCell component="th" scope="row">
                        {data.githubId}
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="right">{data.totalCommitCount}</StyledTableCell>
                    <StyledTableCell align="right">{data.oneWeekCommitCount}</StyledTableCell>
                    <StyledTableCell align="right">{data.lastCommitDate}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

		</div>
	)
}
