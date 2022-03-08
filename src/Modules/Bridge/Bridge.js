import exchange from "../../assets/exchange.png";
import ethereum from "../../assets/ethereum.svg";
import "./FormMain.css";

function FormMain() {
  return (
    <div>
      <form>
        <div className="parent-row">
          <div className="fl">
            <div className="fs-12  c-b pt-3  left-label">Source</div>
            {/* <Link>Create</Link> */}
            <div className="block-chain-container">
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
            </div>
          </div>

          <img className="exchane-img fl-img" src={exchange} />

          <div className="fl">
            <div className="fs-12  c-b pt-3  left-label">Destination</div>
            {/* <Link>Create</Link> */}
            <div className="block-chain-container">
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
            </div>
          </div>
        </div>
        <div>
          <div className="fs-12  c-b pt-3    left-label ">Select Token*</div>
          <div className="block-chain-container">
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
          </div>
        </div>
        <div className="hint-label fs-10  c-b ">Copy XETH Token Address </div>
        <div className="fs-12  c-b pt-3  left-label">Amount*</div>
        <div>
          <input
            type="name"
            name="amount"
            className="input-box-1 fs-12 fw-b"
            placeholder="0"
          />
        </div>

        <div className="fs-12  c-b pt-3  left-label">Destination Address*</div>
        <div>
          <input
            type="name"
            name="amount"
            className="input-box-1 fs-12 fw-b"
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

export default FormMain;
