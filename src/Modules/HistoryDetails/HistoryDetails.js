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
  
  const [data, setData] = useState("")
  const [xdata, x] = useState("");
  const [setTime, time] = useState("");
  const [setAmount, selectAmount] = useState("");
  const [setBlock, selectBlock] = useState("");
  const [xhash, selectHash] = useState("");
  let transaction;
  let transactionTime;
  let non;
  let hashing;
  let amount;
  let dateTimeStamp;
  const location = useLocation();
  

  const fetchURL = "http://3.109.251.40"
  const getData = () =>
    fetch(`${fetchURL}/txns`)
      .then((res) => res.json())
  useEffect(() => {
    getData().then((data) => setData(data))
  }, [])

  const History = async () => {

    const Web3 = require('web3')
    const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.apothem.network/'))

    // Get address
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)



    // for (var i = 0; i < data.data.length; i++) {
      console.log("nanai",location.state.xhash )
      for (var i = 0; i <=data.data.length; i++) {
      hashing = data.data[i];
      if( location.state.xhash === hashing){
      console.log("mond", hashing);
      transaction = await web3.eth.getTransaction(hashing);
      non = await web3.eth.getBlock(hashing);
      
      dateTimeStamp = await web3.eth.getTransaction(hashing).blockNumber;
      //timestamp
      
      amount = await web3.utils.fromWei(transaction.value, 'ether');
      

      selectHash(hashing);
      console.log("hdhdhdjd", transaction);
      // console.log("okay", dateTimeStamp);
      x(transaction);
      selectAmount(amount);
      }
    }
    };
function createData(name, calories, fat, carbs, protein) {
  
  return { name, calories, fat, carbs, protein };

}

const rows = [
  
  createData("Name", "XDC"),
  createData("From", "Ropsten"),
  createData("Amount", setAmount),
  createData("Hash",  xhash),
  createData("Gingerbread", 356),
];


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
                <button onClick={History}> fetch</button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
 
  );
}

export default HistoryDetailsCard;