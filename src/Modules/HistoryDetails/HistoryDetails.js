import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useState, useEffect } from 'react';
import TableContainer from "@mui/material/TableContainer";
import { useLocation } from "react-router-dom";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import copy from "../../assets/copy.png";
import { width } from "@mui/system";

function HistoryDetailsCard() {
  const location = useLocation();

 
function createData(name, calories, fat, carbs, protein) {
  
  return { name, calories, fat, carbs, protein };

}

const rows = [
  
  createData("Name", "XDC"),
  createData("From", "Ropsten"),
  createData("Amount", location.state.row.Tokens),
  createData("Hash",  location.state.row.Hash),
  
];

console.log("bruh", location.state.row.Hash);
  return (
    <Box className="pool-box">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ width: "35%" }} scope="row">
                  <img src={copy} />
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                
               
              </TableRow>
            ))}
             
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
 
  );
}

export default HistoryDetailsCard;