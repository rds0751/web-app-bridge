import exchange from "../../assets/exchange.png";
import ethereum from "../../assets/ethereum.svg";
import copy from "../../assets/copy.png";
import max from "../../assets/max.png";
import "./FormMain.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Select from "react-select";

function BridgeCard() {
  const data = [
    {
      value: 1,
      text: "Up Arrow",
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
      value: 2,
      text: "Down Arrow",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-down-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
          />
        </svg>
      ),
    },
    {
      value: 3,
      text: "Left Arrow",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
      ),
    },
    {
      value: 4,
      text: "Right Arrow",
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
  const [selectedOption, setSelectedOption] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  return (
    <div>
      <form>
        <div className="parent-row">
          <div className="fl ">
            <div className="fs-12  c-b pt-3  left-label ">Source</div>
            {/* <div className="block-chain-container"> */}
            {/* <div>
                <img src={ethereum} height="35px" />
              </div> */}
            {/* <div className="block-chain-right "> */}
            {/* <select className="input-box-1 fs-12 fw-b rm-border">
                  <option style={{ color: "#707070" }}>Select Category</option>

                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select> */}

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

            {/* {selectedOption && (
                  <div style={{ marginTop: 20, lineHeight: "25px" }}>
                    <b>Selected Option:</b> {selectedOption.value}
                  </div>
                )} */}
            {/* </div> */}
            {/* </div> */}
          </div>

          <img className="exchane-img fl-img" src={exchange} />

          <div className="fl">
            <div className="fs-12  c-b pt-3  left-label">Destination</div>
            <Select
              isSearchable={false}
              isClearable={false}
              className="alignLeft input-box-1 fs-12 fw-b rm-border"
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
            {/* <div className="block-chain-container">
              <div>
                <img src={ethereum} height="35px" />
              </div>
              <div className="block-chain-right ">
                <select className="input-box-1 fs-12 fw-b rm-border">
                  <option style={{ color: "#707070" }}>Select Category</option>

                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <div className="fs-12  c-b pt-3    left-label ">Select Token*</div>
          <Select
            isSearchable={false}
            isClearable={false}
            className="alignLeft drop-padding token-select fs-12 fw-b rm-border"
            placeholder="Select Option"
            value={selectedOption}
            options={data}
            onChange={handleChange}
            getOptionLabel={(e) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {e.icon}
                <span style={{ marginLeft: 5, color: "black" }}>{e.text}</span>
              </div>
            )}
          />
          {/* <div className="block-chain-container">
            <div>
              <img src={ethereum} height="35px" />
            </div>
            <div className="block-chain-right ">
              <select className="input-box-1 rm-border fs-12 fw-b">
                <option value="">Select Category</option>
                <option selected value="Ethereum">
                  Select Token
                </option>
              </select>
            </div>
          </div> */}
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
            name="amount"
            className="amount-box-inner fs-12 fw-b rm-border-amount"
            placeholder="0"
          />
          <Link to="#">
            <img src={max} height="20px" />
          </Link>
        </div>

        <div className="fs-12  c-b pt-3  left-label">Destination Address*</div>
        <div className="destination">
          <input
            type="name"
            name="amount"
            className="input-box-1 fs-12 fw-b "
            placeholder="Wallet Address"
          />
        </div>

        <button type="submit" className="submit-button">
          Connect Wallet
        </button>
      </form>
    </div>
  );
}

export default BridgeCard;
