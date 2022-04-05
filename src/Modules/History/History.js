import React from "react";
import { Box } from "@mui/material";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Tab } from "react-bootstrap";
import Faq from "react-faq-component";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@mui/icons-material/Search";

import xdc3 from "../../utils/xdc3";

import "./Pool.css";
import { ContactlessOutlined, NoBackpackSharp } from "@mui/icons-material";



let results;
const rows = []

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function HistoryCard() {

  const classes = useStyles();
  const [data, setData] = useState("")
  const [xdata, x] = useState("");
  const [setTime, time] = useState("");
  const [setAmount, selectAmount] = useState("");
  const [setBlock, selectBlock] = useState("");
  const [xhash, selectHash] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedClickHash, setSelectedClickHash] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  let transaction;
  let transactionTime;
  let non;
  let hashing;
  let amount;
  let dateTimeStamp;
  let bcd;
  
  const fetchURL = "http://3.109.251.40"
  const getData = () =>
    fetch(`${fetchURL}/txns`)
      .then((res) => res.json())
  useEffect(() => {
    getData().then((data) => setData(data))
  }, [],
  )

  console.log("acfsdtion", data.data );

  //  const index =length.[0, abc];
  
  const History = async () => {

    const Web3 = require('web3')
    const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.apothem.network/'))

    // Get address
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)



    for (var i = 0; i < data.data.length; i++) {
    
      hashing = data.data[i];
      console.log("mond", hashing);
      transaction = await web3.eth.getTransaction(hashing);
      non = await web3.eth.getBlock(hashing);

      dateTimeStamp = await web3.eth.getTransaction(hashing).blockNumber;
      //timestamp

      amount = await web3.utils.fromWei(transaction.value, 'ether');


      selectHash(hashing);
      setSelectedOption(hashing)
      console.log("hdhdhdjd", transaction);
      // console.log("okay", dateTimeStamp);
      x(transaction);
      selectAmount(amount);
      rows.push(
        {
          "ActionImg": " /images/XDC.svg",
          "Action": " to Ropsten",
          "Tokens": amount,
          "TokensImg": "/images/XDC.svg",
          "TokensTo": "",
          "Hash": hashing,
          "TokensToImg": "",
          "Time": setTime
        }
      )

    }

    
  };




  

  return (
    <Box className="pool-box">
      <div className="investment-div">
        <p>History</p>
      </div>
      <div className="filter-Export">
        <button onClick={History} className="filter-button mr12">
          Filter
        </button>
        <button className="filter-button">Export</button>
      </div>
      <Tabs
        defaultActiveKey="Top Tokens"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Top Tokens" title="Complete">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="left">#</TableCell> */}
                  <TableCell>Action</TableCell>
                  <TableCell>Tokens</TableCell>
                  <TableCell>Hash</TableCell>
                  {/* <TableCell>Time</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (

                  
                  <TableRow key={row.name}>
                    {/* <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell> */}
                    <TableCell>
                      <img src={row.ActionImg} />
                      &nbsp;&nbsp;

                      {row.Action}

                    </TableCell>
                    <TableCell>
                      <img src={row.TokensImg} />
                      &nbsp;&nbsp;{row.Tokens}&nbsp;&nbsp;&nbsp;&nbsp;
                      <img src={row.TokensToImg} />
                      &nbsp;&nbsp;{row.TokensTo}
                    </TableCell>
                    
                    <Link className="link" to="/HistoryDetails" state={{ xhash, setAmount,  row}} >
                      <TableCell onClick={ ()=> setSelectedClickHash (row.Hash)
                      } onChange={handleChange} value={selectedOption}  >{row.Hash}</TableCell>
                    </Link>
                    <TableCell>{row.Time}</TableCell>
                    {/* <TableCell>{row.apr}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Tab>
        <Tab eventKey="Your Liquidity" title="Pending">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="left">#</TableCell> */}
                  <TableCell>Action</TableCell>
                  <TableCell>Tokens</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    {/* <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell> */}
                    <TableCell>
                      <img src={row.ActionImg} />
                      &nbsp;&nbsp;{row.Action}
                    </TableCell>
                    <TableCell>
                      <img src={row.TokensImg} />
                      &nbsp;&nbsp;{row.Tokens}&nbsp;&nbsp;&nbsp;&nbsp;
                      <img src={row.TokensToImg} />
                      &nbsp;&nbsp;{row.TokensTo}
                    </TableCell>

                    <TableCell onChange={handleChange} >{row.Hash}</TableCell>
                    <TableCell>{row.Time}</TableCell>
                    {/* <TableCell>{row.apr}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Tab>
      </Tabs>
    </Box>
  );
  

}

export default HistoryCard;