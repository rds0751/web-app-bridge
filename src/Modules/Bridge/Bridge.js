//Importing the libraries
import exchange from "../../assets/exchange.png";
import ethereum from "../../assets/ethereum.svg";
import copy from "../../assets/copy.png";
import max from "../../assets/max.png";
import "./FormMain.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import xdc3 from "../../utils/xdc3";
import Web3 from "web3";
import token from "../../utils/xtoken";
import xbridge from "../../utils/xbridge";
import tokenList from "../../contracts/tokenlist.json";
import Bridge from "../../contracts/bridge.json";
import Deploy from "../../contracts/deployer.json";
import BridgeConfirm from "./BridgeConfirm";
import {
  tokenBridge,
  tokenDeployee,
  eBridgeAddress,
  deployee,
  xBridgeAddress,
} from "../../common/constant";

//defining the Global variable
let debridgeId,
  submissionId,
  signatures,
  abc,
  transactionHash,
  transactionHashes;

//Main Function
function BridgeCard() {
  const [buttonText, setButtonText] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [txt, setTxt] = useState("");

  const onInputChange = (e) => {
    const { value } = e.target;
    console.log("Input value: ", value);

    const re = /^[A-Za-z]+$/;
    if (value === "" || re.test(value)) {
      setTxt(value);
    }
  };
  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#9D9D9D",
      };
    },
  };
  const data = [
    {
      value: 3,
      text: "Ethereum",
      icon: "/images/ethereum.svg",
    },
    {
      value: 51,
      text: "XDC",
      icon: "/images/XDC.svg",
    },
  ];

  const dataDestination = [
    {
      value: 51,
      text: "XDC",
      icon: "/images/XDC.svg",
    },
    {
      value: 3,
      text: "Ethereum",
      icon: "/images/ethereum.svg",
    },
  ];

  const [selectedOptionToken, setSelectedOptionToken] = useState(null);

  // handle onChange event of the dropdown
  const handleChangeToken = (e) => {
    setSelectedOptionToken(e);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [icon, setIcon] = useState("");
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
    setIcon(e?.icon);
  };

  const [selectedOptionDestination, setSelectedOptionDestination] =
    useState(null);
  const [text, setText] = useState("");
  // handle onChange event of the dropdown
  const handleChangeDestination = (e) => {
    setSelectedOptionDestination(e);
    setText(e?.icon);
  };

  useEffect(() => [selectedOptionDestination, selectedOption, icon, address]);
  return (
    <>
      {/* <div style={{display : "none"}}><BridgeConfirm amount={amount}/> </div> */}
      <div>
        <form>
          <div className="parent-row">
            <div className="fl ">
              <div className="fs-12  c-b pt-3  left-label ">Source</div>
              <Select
                isSearchable={false}
                isClearable={false}
                className="alignLeft input-box-1 fs-12 fw-b rm-border "
                placeholder="Select Option"
                value={selectedOption}
                options={data}
                onChange={(e) => {
                  handleChange(e);
                }}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src={e.icon}
                    />
                    <span style={{ marginLeft: 5, color: "black" }}>
                      {e.text}
                    </span>
                  </div>
                )}
              />
            </div>
            <div style={{ padding: "76px 11px 0 0px" }}>
              <img
                style={{
                  width: "28px",
                  height: "27px",
                }}
                src="/images/Arrow (1).svg"
              />
            </div>
            <div className="fl">
              <div className="fs-12  c-b pt-3  left-label">Destination</div>
              <Select
                isSearchable={false}
                isClearable={false}
                className="alignLeft input-box-1 fs-12 fw-b rm-border"
                placeholder="Select Option"
                value={selectedOptionDestination}
                options={dataDestination}
                onChange={handleChangeDestination}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src={e.icon}
                    />
                    <span style={{ marginLeft: 5, color: "black" }}>
                      {e.text}
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
          <div>
            <div className="fs-12  c-b pt-3    left-label ">Select Token*</div>
            <Select
              isSearchable={false}
              isClearable={false}
              className="alignLeft drop-padding token-select fs-12 fw-b rm-border"
              placeholder="Select Option"
              styles={colourStyles}
              value={selectedOptionToken}
              options={tokenList.tokens}
              onChange={handleChangeToken}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img style={{ marginRight: "5px" }} src={e.image} /> {e.name}
                  <span style={{ marginLeft: 5, color: "black" }}></span>
                </div>
              )}
            />
          </div>
          <div className="hint-label fs-10  c-b ">
            Copy XETH Token Address
            <Link className="copy-link" to="#">
              <div className="copy-token">
                <img src={copy} height="12px" />
                <div>XDC Network</div>
              </div>
            </Link>
            <Link className="copy-link" to="#">
              <div className="copy-token">
                <img src={copy} height="12px" />
                <div>Ethereum</div>
              </div>
            </Link>
          </div>
          <div className="fs-12  c-b pt-3  left-label">Amount*</div>
          <div className="amount-box-outer fs-12 fw-b">
            <input
              type="text"
              name="amount"
              className="amount-box-inner fs-12 fw-b rm-border-amount"
              onChange={(e) => {
                const val = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
                  .replace(/^0[^.]/, "0");
                setAmount(val);
              }}
              // Assign State
              value={amount}
              placeholder="0"
            />
            <Link to="#">
              <img src={max} height="20px" />
            </Link>
          </div>

          <div className="fs-12  c-b pt-3  left-label">
            Destination Address*
          </div>
          <div className="destination">
            <input
              type="name"
              name="amount"
              className="input-box-1 fs-12 fw-b "
              placeholder="Wallet Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Link
            to="/bridge-confirm-transaction"
            state={{
              address,
              amount,
              selectedOptionToken,
              source: `${icon}`,
              destination: `${text}`,
            }}
          >
            {" "}
            <button type="submit" className="submit-button">
              Next
            </button>
          </Link>
          {/* , selectedOption , selectedOptionDestination */}

          {/* <center> <a href={'https://explorer.apothem.network/txs/' + hash} target='_blank' style={{ color: "black", fontSize: "9px" }}> {hash} </a></center>
        <center>  <a href={'https://ropsten.etherscan.io/tx/' + hasher} target='_blank' style={{ color: "black", fontSize: "9px" }}> {hasher} </a> </center> */}
        </form>
      </div>
    </>
  );
}

export default BridgeCard;
