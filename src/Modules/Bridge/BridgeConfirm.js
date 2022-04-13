import React, { useState } from "react";
import Header from "../Common/header";
import SideBar from "../Common/drawer";
import Box from "@mui/material/Box";
import { Button } from "react-bootstrap";
import { Divider } from "@mui/material";
import { Modal } from "react-bootstrap";
import ProgressBar from "./Progress1";
import { Link, useLocation } from "react-router-dom";
import { PregnantWomanSharp } from "@material-ui/icons";
import xdc3 from "../../utils/xdc3";
import Web3 from "web3";
import token from "../../utils/xtoken";
import xbridge from "../../utils/xbridge";
import tokenList from "../../contracts/tokenlist.json";
import Bridge from "../../contracts/bridge.json";
import Deploy from "../../contracts/deployer.json";
import {
  tokenBridge,
  tokenDeployee,
  eBridgeAddress,
  deployee,
  xBridgeAddress,
} from "../../common/constant";
let debridgeId,
  submissionId,
  signatures,
  abc,
  transactionHash,
  transactionHashes,
  transaction;
//Main Function
function BridgeConfirm() {
  const [show, setShow] = useState(false);
  const [chainTo, setChainTo] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  return (
    <>
      <Box>
        <Header />
        <SideBar />
        <div>
          <div className="main-head">
            {" "}
            <p>Bridge</p>
          </div>
          <div className="my-card my-card-second">
            <p className="review">Review Transaction</p>
            <Divider className="mb-23" />
            <div className="image-flex">
              <img className="token-img" src={location?.state?.source}></img>
              <img src="/images/Arrow.svg" alt="sachin"></img>
              <img
                className="token-img"
                src={location?.state?.destination}
              ></img>
            </div>
            <div className="asset-flex">
              <p>Asset</p>
              <p className="second-p">
                {location.state.selectedOptionToken.name}
              </p>
            </div>
            <Divider className="mb-23" />
            <div className="asset-flex">
              <p>Amount</p>
              <p>{location.state.amount}</p>
              {console.log("njnvd", location.state.amount)}
            </div>
            {/* <Divider className="mb-23" />
            <div className="asset-flex">
              <p>Destination</p>
              <p>{location.state.address}</p>
            </div> */}
            <Divider className="mb-23" />
            <div className="asset-flex">
              <p>You will get</p>
              <p>{location.state.amount}</p>
            </div>
            <Divider className="mb-23" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/bridge">
                {" "}
                <button className="cancel-button">Cancel</button>{" "}
              </Link>
              <button className="confirm-button" onClick={handleShow}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Box>
      <Modal style={{marginTop : "5px" , zIndex :"999999999" }} show={show} animation={false}>
        <Modal.Header>
          <ProgressBar />
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}
export default BridgeConfirm;