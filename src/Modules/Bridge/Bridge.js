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

  const data = [
    {
      value: 3,
      text: "Ropsten",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="28px"
          height="28px"
        >
          <path
            fill="#4caf50"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          />
          <path fill="#fff" d="M21,14h6v20h-6V14z" />
          <path fill="#fff" d="M14,21h20v6H14V21z" />
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
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
          />
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
              <div className="fs-12  c-b pt-3  left-label ">Source</div>
              <Select
                isSearchable={false}
                isClearable={false}
                className="alignLeft input-box-1 fs-12 fw-b rm-border "
                placeholder="Select Option"
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
                marginBottom: "-31px",
                marginLeft: "-21px",
                marginRight: "7px",
                marginTop: "4px",
              }}
              src="/images/Arrow (1).svg"
            />

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
              type="number"
              min="0"
              onkeypress="return event.charCode != 45"
              name="amount"
              className="amount-box-inner fs-12 fw-b rm-border-amount"
              onChange={(e) => {
                const str = e.target.value.toString();
                console.log("str", str);
                let val = parseInt(e.target.value, 10);
                if (str.includes("--")) {
                  val = 0;
                  setAmount(val);
                }

                if (isNaN(val)) {
                  setAmount("");
                } else {
                  // is A Number
                  val = val >= 0 ? val : 0;
                  setAmount(val);
                }
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
              type="number"
              min="0"
              oninput="this.value = Math.abs(this.value)"
              name="amount"
              className="input-box-1 fs-12 fw-b "
              placeholder="Wallet Address"
              onChange={(e) => setAddress(e.target.value)}
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
