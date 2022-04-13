//Importing the libraries
import exchange from "../../assets/exchange.png";
import ethereum from "../../assets/ethereum.svg";
import copy from "../../assets/copy.png";
import max from "../../assets/max.png";
import "./FormMain.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
      text: "Ropsten",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 38 38"
        >
          <g id="Ether" transform="translate(-1012 -207)">
            <g
              id="Ethereum-icon-purple"
              transform="translate(1021.854 211.106)"
            >
              <path
                id="Path_2"
                data-name="Path 2"
                d="M429.377,80.7,420.1,96.1l9.277-4.217Z"
                transform="translate(-420.1 -80.7)"
                fill="#8a92b2"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M429.377,731l-9.277,4.217,9.277,5.485Z"
                transform="translate(-420.1 -719.821)"
                fill="#62688f"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M969.079,96.1,959.8,80.7V91.879Z"
                transform="translate(-950.523 -80.7)"
                fill="#62688f"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M959.8,740.7l9.279-5.485L959.8,731Z"
                transform="translate(-950.523 -719.821)"
                fill="#454a75"
              />
              <path
                id="Path_6"
                data-name="Path 6"
                d="M420.1,1078.7l9.277,13.075v-7.593Z"
                transform="translate(-420.1 -1061.544)"
                fill="#8a92b2"
              />
              <path
                id="Path_7"
                data-name="Path 7"
                d="M959.8,1084.182v7.593l9.284-13.075Z"
                transform="translate(-950.523 -1061.544)"
                fill="#62688f"
              />
            </g>
            <g
              id="Ellipse_1"
              data-name="Ellipse 1"
              transform="translate(1012 207)"
              fill="none"
              stroke="#ebebeb"
              stroke-width="1"
            >
              <circle cx="19" cy="19" r="19" stroke="none" />
              <circle cx="19" cy="19" r="18.5" fill="none" />
            </g>
          </g>
        </svg>
      ),
    },
    {
      value: 51,
      text: "XDC",
      icon: (
        <svg
          id="XDC"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 38 38"
        >
          <path
            id="Combined_Shape"
            data-name="Combined Shape"
            d="M19,38A19.15,19.15,0,0,1,6.213,33.125,18.921,18.921,0,0,1,0,21.133L4.293,19,0,16.867A18.92,18.92,0,0,1,6.213,4.875a19.209,19.209,0,0,1,25.575,0A18.921,18.921,0,0,1,38,16.868L33.707,19,38,21.133a18.92,18.92,0,0,1-6.212,11.992A19.148,19.148,0,0,1,19,38Z"
            fill="#2149b9"
          />
          <path
            id="X"
            d="M2.956,14.547,6.113,9.212,9.26,14.547h2.966L7.7,7.214,12.125,0H9.189L6.113,5.255,3.036,0H.1L4.534,7.214,0,14.547Z"
            transform="translate(12.855 11.761)"
            fill="#fff"
          />
        </svg>
      ),
    },
  ];

  const dataDestination = [
    {
      value: 51,
      text: "XDC",
      icon: (
        <svg
          id="XDC"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 38 38"
        >
          <path
            id="Combined_Shape"
            data-name="Combined Shape"
            d="M19,38A19.15,19.15,0,0,1,6.213,33.125,18.921,18.921,0,0,1,0,21.133L4.293,19,0,16.867A18.92,18.92,0,0,1,6.213,4.875a19.209,19.209,0,0,1,25.575,0A18.921,18.921,0,0,1,38,16.868L33.707,19,38,21.133a18.92,18.92,0,0,1-6.212,11.992A19.148,19.148,0,0,1,19,38Z"
            fill="#2149b9"
          />
          <path
            id="X"
            d="M2.956,14.547,6.113,9.212,9.26,14.547h2.966L7.7,7.214,12.125,0H9.189L6.113,5.255,3.036,0H.1L4.534,7.214,0,14.547Z"
            transform="translate(12.855 11.761)"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      value: 3,
      text: "Ropsten",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 38 38"
        >
          <g id="Ether" transform="translate(-1012 -207)">
            <g
              id="Ethereum-icon-purple"
              transform="translate(1021.854 211.106)"
            >
              <path
                id="Path_2"
                data-name="Path 2"
                d="M429.377,80.7,420.1,96.1l9.277-4.217Z"
                transform="translate(-420.1 -80.7)"
                fill="#8a92b2"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M429.377,731l-9.277,4.217,9.277,5.485Z"
                transform="translate(-420.1 -719.821)"
                fill="#62688f"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M969.079,96.1,959.8,80.7V91.879Z"
                transform="translate(-950.523 -80.7)"
                fill="#62688f"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M959.8,740.7l9.279-5.485L959.8,731Z"
                transform="translate(-950.523 -719.821)"
                fill="#454a75"
              />
              <path
                id="Path_6"
                data-name="Path 6"
                d="M420.1,1078.7l9.277,13.075v-7.593Z"
                transform="translate(-420.1 -1061.544)"
                fill="#8a92b2"
              />
              <path
                id="Path_7"
                data-name="Path 7"
                d="M959.8,1084.182v7.593l9.284-13.075Z"
                transform="translate(-950.523 -1061.544)"
                fill="#62688f"
              />
            </g>
            <g
              id="Ellipse_1"
              data-name="Ellipse 1"
              transform="translate(1012 207)"
              fill="none"
              stroke="#ebebeb"
              stroke-width="1"
            >
              <circle cx="19" cy="19" r="19" stroke="none" />
              <circle cx="19" cy="19" r="18.5" fill="none" />
            </g>
          </g>
        </svg>
      ),
    },
  ];

  const [selectedOptionToken, setSelectedOptionToken] = useState(null);

  // handle onChange event of the dropdown
  const handleChangeToken = (e) => {
    setSelectedOptionToken(e);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
  };

  const [selectedOptionDestination, setSelectedOptionDestination] =
    useState(null);

  // handle onChange event of the dropdown
  const handleChangeDestination = (e) => {
    setSelectedOptionDestination(e);
  };
  return (
    <>
      {/* <div style={{display : "none"}}><BridgeConfirm amount={amount}/> </div> */}
      <div>
        <form>
          <div className="parent-row">
            <div className="fl ">
              <div className="fs-12  c-b pt-3  left-label ">Source*</div>
              <Select
                isSearchable={false}
                isClearable={false}
                className="alignLeft input-box-1 fs-12 fw-b rm-border css-14el2xx-placeholder"
                placeholder="Select Option"
                styles={colourStyles}
                value={selectedOption}
                options={data}
                onChange={handleChange}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {e.icon}
                    <span style={{ marginLeft: 5, color: "black" }}>
                      {e.text}
                    </span>
                  </div>
                )}
              />
            </div>

            <img
              style={{
                width: "28px",
                height: "27px",
                marginBottom: "-37px",
                marginLeft: "-9px",
                marginRight: "12px",
                marginTop: "41px",
              }}
              src="/images/Arrow (1).svg"
            />

            <div className="fl">
              <div className="fs-12  c-b pt-3  left-label ">Destination*</div>
              <Select
                isSearchable={false}
                isClearable={false}
                className="alignLeft input-box-1 fs-12 fw-b rm-border "
                placeholder="Select Option"
                styles={colourStyles}
                value={selectedOptionDestination}
                options={dataDestination}
                onChange={handleChangeDestination}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {e.icon}
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
                  {e.name}
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
              type="text"
              name="address"
              className="input-box-1 fs-12 fw-b "
              // oninput="this.value = this.value.replace
              onChange={(e) => setAddress(e.target.value)}
              // Assign State
              value={address}
              placeholder="Wallet Address"
            />
          </div>
          <Link
            to="/bridge-confirm-transaction"
            state={{ amount, address, selectedOptionToken }}
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
