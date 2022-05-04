import React from "react";
import moment from "moment";
import { Box } from "@mui/material";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
const rows = [];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function HistoryCard() {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [xdata, x] = useState("");
  const [setTime, time] = useState("");
  const [setAmount, selectAmount] = useState("");
  const [setBlock, selectBlock] = useState("");
  const [xhash, selectHash] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedClickHash, setSelectedClickHash] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate()

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  let transaction;
  let transactionTime;
  let transactionTimes;
  let non;
  let hashing;
  let amount;
  let dateTimeStamp;
  let bcd;
  let selectedTimes;

  const fetchURL = "https://testapi.xdcbridge.com";
  const getData = () => fetch(`${fetchURL}/txns`).then((res) => res.json());
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  console.log("acfsdtion", data.data);

  //  const index =length.[0, abc];

  const History = async () => {
    const Web3 = require("xdc3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://rpc.apothem.network/")
    );


    // Get address
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    for (var i = 0; i <= data.data.length; i++) {
      hashing = data.data[i];
      console.log("mond", hashing);

      transaction = await web3.eth.getTransaction(hashing);
      //timestamp
      non = await web3.eth.getBlock(transaction["blockNumber"]);
      if (web3.utils.fromWei(transaction.value, "ether"))
        amount = await web3.utils.fromWei(transaction.value, "ether");
      dateTimeStamp = non["timestamp"];
      // transactionTime = new Date(dateTimeStamp);
      const transactionTime = moment(dateTimeStamp * 1000).fromNow();
      transactionTimes = new Date(dateTimeStamp * 1000).toLocaleString();
      selectedTimes = transactionTimes;
      setSelectedTime(selectedTimes);
      console.log("time", dateTimeStamp);
      var time = selectHash(hashing);
      setSelectedOption(hashing);
      console.log("hdhdhdjd", transaction);
      console.log("okay");
      console.log("tran", transaction);
      console.log("kiki", transactionTime);
      x(transaction);
      selectAmount(amount);

      rows.push({
        ActionImg: " /images/XDC.svg",
        Action: " to Ropsten",
        Tokens: amount,
        TokensImg: "/images/XDC.svg",
        TokensTo: "",
        Hash: hashing,
        TokensToImg: "",
        Time: transactionTime,
        TimeDetail: selectedTime,
      });
    }
  };

  React.useEffect(() => {
    History();
  });

  return (
    <Box className="pool-box">
        <p className="header-market">History</p>
      <div className="filter-Export">
        <button className="flex items-center justify-center history-buttons text-white px-3 py-2 rounded-full mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <g id="filter" transform="translate(-1391 -195)">
              <rect
                id="Rectangle_68"
                data-name="Rectangle 68"
                width="16"
                height="16"
                transform="translate(1391 195)"
                fill="none"
              />
              <g
                id="Filter-2"
                data-name="Filter"
                transform="translate(1392.006 197)"
              >
                <g
                  id="Group_835"
                  data-name="Group 835"
                  transform="translate(-0.006)"
                >
                  <path
                    id="Path_817"
                    data-name="Path 817"
                    d="M7.929,5.889,11.9,1.044H1.664L5.674,5.889a.674.674,0,0,1,.125.376v4.343l1.963.961V6.223A.516.516,0,0,1,7.929,5.889ZM13.441.877,8.848,6.431V12.4a.531.531,0,0,1-.752.5L5.047,11.443a.564.564,0,0,1-.334-.5V6.431L.119.877A.537.537,0,0,1,.537,0H13.024A.532.532,0,0,1,13.441.877Z"
                    transform="translate(0.006)"
                    fill="#fff"
                  />
                </g>
              </g>
            </g>
          </svg>
          Filter
        </button>
        <button className="flex items-center justify-center history-buttons text-white px-3 py-2 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g id="export" transform="translate(-1419 -195)">
            <rect id="Rectangle_69" data-name="Rectangle 69" width="16" height="16" transform="translate(1419 195)" fill="none" />
            <g id="export-2" data-name="export" transform="translate(1399 182)">
              <g id="Group_836" data-name="Group 836" transform="translate(22 15)">
                <path id="Path_818" data-name="Path 818" d="M27.556,36.245V26.98L31.893,31.3l.5-.5-5.2-5.2L22,30.8l.5.5,4.337-4.319v9.265Z" transform="translate(-22 -23.7)" fill="#fff" stroke="#fff" stroke-width="0.6" />
                <rect id="Rectangle_63" data-name="Rectangle 63" width="10.253" height="1.025" transform="translate(0.141)" fill="#fff" stroke="#fff" stroke-width="0.6" />
              </g>
            </g>
          </g>
        </svg>
          Export</button>
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
                      &nbsp;&nbsp;
                      {row.Action}
                    </TableCell>
                    <TableCell>
                      <img src={row.TokensImg} />
                      &nbsp;&nbsp;{row.Tokens}&nbsp;&nbsp;&nbsp;&nbsp;
                      <img src={row.TokensToImg} />
                      &nbsp;&nbsp;{row.TokensTo}
                    </TableCell>

                    <Link
                      className="link"
                      to="/HistoryDetails"
                      state={{ xhash, setAmount, row, selectedTime }}
                    >
                      <TableCell
                        onClick={() => setSelectedClickHash(row.Hash)}
                        onChange={handleChange}
                        value={selectedOption}
                      >
                        {row.Hash}
                      </TableCell>
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
                    <TableCell onChange={handleChange}>{row.Hash}</TableCell>
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
