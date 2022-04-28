import React, { useState, useEffect } from "react";
// import toast from 'react-toastify';
import { toast } from "react-toastify";
import XDC3 from "xdc3";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import xdc3 from "../../utils/xdc3";
import Web3 from "web3";
import token from "../../utils/xtoken";
import { Link, useLocation } from "react-router-dom";
import xbridge from "../../utils/xbridge";
import tokenList from "../../contracts/tokenlist.json";
import Bridge from "../../contracts/Gate.json";
import Deploy from "../../contracts/deployer.json";
import DeBridgeGateJson from "../../contracts/Gate.json";
import { TailSpin } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import "react-step-progress/dist/index.css";
import ebridge from "../../utils/ebridge";
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
  tx,
  allowance,
  amount,
  transactionHashes,
  bcd,
  cde,
  transaction,
  accountsing;
export default function App() {
  const [show, setShow] = useState(false);
  const [hash, setHash] = useState("");
  const [hasher, setHasher] = useState("");
  const [chainTo, setChainTo] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstStatus, setFirstStatus] = useState("");
  const [SecoundStatus, setSecoundStatus] = useState("");
  const [ThirdStatus, setThirdStatus] = useState("");
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  toast.configure();

  const OnSubmit = async () => {
    let account;
    //connecting to the xdc testnetwork using chain_id
    await window.web3.eth.getAccounts((err, accounts) => {
      if (err !== null) console.error("");
      else if (accounts.length === 0) {
        account = false;
      } else {
        // console.log("Account",accounts);
        account = true;
      }
    });
    console.log(" ", location.state.selectedOptionToken.address);
    //creating a object using getAccounts
    const accounts = await xdc3.eth.getAccounts();
    console.log("accounts", accounts[0]);
    console.log(" Destination", "3");
    console.log("", location.state.selectedOptionToken.address);
    /**
     * @dev Performing the Approve method for erc20 .
     * @param address Reciever Address.
     * @param amount token should be appr oved to the reciever address
     * @param account[0] sender address.
     * @param data passing the approve method wih reciever address and amount
     */
    if (location.state.selectedOptionToken.chainId === 50) {
      toast.info("Sending the Amount.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      const Web3 = require("web3");
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://apothemxdcpayrpc.blocksscan.io/"
        )
      );
      console.log("akshay");
      transaction = {
        from: accounts[0],
        to: xBridgeAddress, //contractAddress of the concerned token (same in data below)
        value: xdc3.utils.toWei(location.state.amount), // token _amount
        data: xbridge.methods
          .send(
            location.state.selectedOptionToken.address, //address _tokenAddress,
            xdc3.utils.toWei(location.state.amount), // token _amount
            3, // _chainIdTo
            location.state.address, //_receiver
            "0x", // _permit
            false, //_useAssetFee
            0, //_referralCode
            "0x" //_autoParams
          )
          .encodeABI(),
        //value given by user should be multiplied by 1000
      };
      try {
        await window.web3.eth
          .sendTransaction(transaction)
          .on("transactionHash", function (hash) {
            console.log("transaction  ", hash);
            transactionHash = hash;
            setProgress(progress + 50);
            setTimeout(() => {
              toast.warning("Change The Network To Ropsten and Please wait ");
            }, 5000);
          });
      } catch {
        toast.error("Transaction Has been rejected");
        setTimeout(() => {
          window.location.reload(1);
        }, 8000);
      }
    }
    if (location.state.selectedOptionToken.chainId === 1) {
      toast.info("Sending the Amount.");
      window.web3 = new XDC3(window.xdc);
      const xdc3 = new XDC3(window.xdc);
      console.log("abc");
      await window.web3.eth.getAccounts((err, accounts) => {
        if (err !== null) console.error("");
        else if (accounts.length === 0) {
          account = false;
        } else {
          console.log("Account", accounts);
          accountsing = accounts;
          account = true;
        }
      });
      console.log("yAKO", accountsing[0]);
      const bridgeAddress = eBridgeAddress;
      const ebridge = new xdc3.eth.Contract(Bridge.abi, bridgeAddress);
      transaction = {
        from: accountsing[0],
        to: eBridgeAddress, //contractAddress of the concerned token (same in data below)
        value: xdc3.utils.toWei(location.state.amount), // token _amount
        data: ebridge.methods
          .send(
            location.state.selectedOptionToken.address, //address _tokenAddress,
            xdc3.utils.toWei(location.state.amount), // token _amount
            51, // _chainIdTo
            location.state.address, //
            "0x", // _permit
            false, //_receiver_useAssetFee
            0, //_referralCode
            "0x" //_autoParams
          )
          .encodeABI(),
        //value given by user should be multiplied by 1000
      };
      try {
        await window.web3.eth
          .sendTransaction(transaction)
          .on("transactionHash", function (hash) {
            console.log("transaction  ", hash);
            transactionHash = hash;
            setProgress(progress + 50);
            setTimeout(() => {
              toast.warning(
                "Change The Network To XDC Apothem , Make sure while Switching the network whether the Transaction is in pending If it is pending wait for successfull transaction and Then Switch the Network"
              );
            }, 15000);
          });
      } catch {
        toast.error("Transaction Has been rejected");
        setTimeout(() => {
          window.location.reload(1);
        }, 5000);
      }
    }

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: transactionHash }),
      };
      let var1 = 0;
      while (var1 == 0) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: transactionHash }),
        };
        await fetch("https://testapi.xdcbridge.com", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            abc = data;
            toast.info("Please Wait for Some time", { autoClose: 2000 });
          });

        console.log(abc.status);
        if (abc.status != 0) {
          var1 = 1;
          setTimeout(() => {
            toast.success("You Are Almost There !!!");
          }, 3000);
        }
      }

      console.log("transaction hash", transactionHash);

      setSecoundStatus("The");

      console.log(abc);
      debridgeId = abc.debridgeId;
      submissionId = abc.submissionId;
      signatures = abc.signature;
      amount = abc.amount;
      setHash(transactionHash);
      console.log(submissionId, debridgeId);

      /**
       * @dev To claim the tokens from the sender.
       * @param tokenAddress The address of the token.
       */

      /**
       * @dev switching the network to the ropsten.
       * @param chainid chain id of the ropsten testnet.
       */
      setProgress(progress + 50);

      const bridgeAddress = eBridgeAddress;
      /**
       * @dev instance of ebridge, has been instilized because XDCPAY and METAMASK creats only once.
       */
      window.web3 = new Web3(window.ethereum);
      const web3 = new Web3(window.ethereum);
      const ebridge = new web3.eth.Contract(Bridge.abi, bridgeAddress);
      const deployerAddress = deployee;
      /**
       * @dev instance of deploye, has been instilized because XDCPAY and METAMASK creats only once.
       */
      const deploy = new web3.eth.Contract(Deploy.abi, deployerAddress);
      //fetching the address of the sender through metamask

      console.log("", accounts);
      console.log(" Destination", "3");
      const isSubmissionUsed = await ebridge.methods
        .isSubmissionUsed(submissionId)
        .call();
      const debridge_id = await ebridge.methods
        .getDebridgeId(location.state.selectedOptionToken.chainId, tokenBridge)
        .call();

      console.log("debridgeId", debridge_id);
      console.log(" Destination", location.state.selectedOptionToken.chainId);
      console.log("", location.state.selectedOptionToken.address);
      //deploying the smart contract ERC20
      // const deployAsset = await deploy.methods.deployAsset(debridge_id, 'Token Mapped with XDC Chain', 'WXDC1', 18).call();
      const _token = tokenDeployee;
      console.log("amountts", amount);
      /**
       * @dev Get the hash value and the result.
       * @param web3 fetching the web3 from the library.
       */
      const autoParamsFrom = await _packSubmissionAutoParamsFrom(
        web3,
        location.state.address,
        "0x"
      );

      /**
       * @dev Performing the ERC20 claim function.
       * @param debridge_id The address of the token.
       * @param amount Token should be claim from the reciever
       * @param chain_id To chain ID
       * @param address To Address
       * @param submissionId Submission id contains :- nonce, id , address
       * @param signature to verify the contract
       */

      setHasher(transactionHashes);
      letToggle();
      console.log("", submissionId);

      console.log("", location.state.selectedOptionToken.chainId);

      if (location.state.selectedOptionToken.chainId === 50) {
        window.web3 = new XDC3(window.xdc);
        const xdc3 = new XDC3(window.xdc);
        await window.web3.eth.getAccounts((err, accounts) => {
          if (err !== null) console.error("");
          else if (accounts.length === 0) {
            account = false;
          } else {
            console.log("Account", accounts);
            accountsing = accounts;
            account = true;
          }
        });
        console.log("yAKO", accountsing[0]);
        transaction = {
          from: accountsing[0],
          to: eBridgeAddress, //contractAddress of the concerned token (same in data below)
          data: ebridge.methods
            .claim(
              location.state.selectedOptionToken.debridgeAddress,
              amount,
              location.state.selectedOptionToken.chainId,
              location.state.address,
              submissionId,
              signatures,
              autoParamsFrom
              // _token
            )
            .encodeABI(),
          //value given by user should be multiplied by 1000
        };
        console.log("gdjn", transaction);
        console.log("accifdnj", transaction);
        try {
          await window.web3.eth
            .sendTransaction(transaction)
            // .on("confirmation", function (confirmationNumber, receipt) {
            .on("transactionHash", function (hash) {
              console.log("transaction  ", hash);
              transactionHashes = hash;
              setHasher(transactionHashes);
              setProgress(progress + 100);
            });
        } catch {
          toast.info(
            " Dont worry if your money is deducted, you can apply for reversal/refund here",
            { position: toast.POSITION.TOP_RIGHT, autoClose: 15000 }
          );
          setTimeout(() => {
            window.location.reload(1);
          }, 8000);
        }
      } else {
        window.web3 = new XDC3(window.xdc);
        const xdc3 = new XDC3(window.xdc);
        await window.web3.eth.getAccounts((err, accounts) => {
          if (err !== null) console.error("");
          else if (accounts.length === 0) {
            account = false;
          } else {
            console.log("Account", accounts);
            accountsing = accounts;
            account = true;
          }
        });
        console.log("yAKO", accountsing[0]);
        transaction = {
          from: accountsing[0],
          to: xBridgeAddress, //contractAddress of the concerned token (same in data below)
          data: xbridge.methods
            .claim(
              location.state.selectedOptionToken.debridgeAddress,
              amount,
              location.state.selectedOptionToken.chainId,
              location.state.address,
              submissionId,
              signatures,
              autoParamsFrom
              // _token
            )
            .encodeABI(),
          //value given by user should be multiplied by 1000
        };
        console.log("accifdnj", transaction);
        try {
          await window.web3.eth
            .sendTransaction(transaction)
            // .on("confirmation", function (confirmationNumber, receipt) {
            .on("transactionHash", function (hash) {
              console.log("transaction  ", hash);
              transactionHashes = hash;
              setHasher(transactionHashes);
              setProgress(progress + 100);
            });
        } catch {
          toast.info(
            " Dont worry if your money is deducted, you can apply for reversal/refund here",
            { position: toast.POSITION.TOP_RIGHT, autoClose: 15000 }
          );
          setTimeout(() => {
            window.location.reload(1);
          }, 8000);
        }
      }

      /**
       *@dev Retrning the hash.
       * @param web3 Librabry.
       * @param autoParams autoparam
       * @returns return the successfull hash value
       */
      async function _packSubmissionAutoParamsFrom(
        web3,
        nativeSender,
        autoParams
      ) {
        if (autoParams !== "0x" && autoParams !== "") {
          const decoded = web3.eth.abi.decodeParameters(
            ["tuple(uint256,uint256, bytes, bytes)"],
            autoParams
          );
          console.log(`autoParams: ${autoParams}, decoded: ${decoded}`);
          const encoded = web3.eth.abi.encodeParameter(
            "tuple(uint256,uint256, address, bytes, bytes)",
            [
              decoded[0][0],
              decoded[0][1],
              decoded[0][2],
              decoded[0][3],
              nativeSender,
            ]
          );
          console.log(`encoded: ${encoded}`);
          return encoded;
        }
        return "0x";
      }
    } catch (error) {
      console.log(error);
      toast.info(
        " Dont worry if your money is deducted, you can apply for reversal/refund here",
        { position: toast.POSITION.TOP_RIGHT, autoClose: 8000 }
      );
      setTimeout(() => {
        window.location.reload(1);
      }, 10000);
    }
  };

  useEffect(() => {
    OnSubmit();
  }, []);

  const [spinnerLoading, setSpinnerLoading] = useState(true);
  const [show_Hide_Image, setShowHideImage] = useState("none");
  const [a, setA] = useState(false);
  const [progressText, setProgressText] = useState("Show Image Component");
  const letToggle = () => {
    if (show_Hide_Image === "flex") {
      setA(true);
      setSpinnerLoading(true);
      setShowHideImage("none");
      setProgressText("Transafering the Amount");
    } else {
      setSpinnerLoading(false);
      setShowHideImage(true);
      setProgressText("Transafering the Amount");
    }
  };
  return (
    <div className="App">
      <ProgressBar
        filledBackground="#20AA15"
        hasStepZero="false"
        height="1px"
        percent={progress}
      >
        <Step>
          {({ accomplished, index }) => (
            <>
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                {index + 1}
              </div>
              <div className={"test"}>Transfer</div>
            </>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <>
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                {index + 1}
              </div>
              <div className={"test"}>Confirmation</div>
            </>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <>
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                {index + 1}
              </div>
              <div className={"test"}>Recieve</div>
            </>
          )}
        </Step>
      </ProgressBar>
      <div className="done">
        <TailSpin
          color="#2358E5"
          height={70}
          width={70}
          visible={spinnerLoading}
        />
        <img
          style={{ display: show_Hide_Image }}
          className="successImg"
          src="/images/successful.svg"
          alt="Successful"
        ></img>
        <Link
          className={a ? "viewOnXDCText" : "viewOnXDCTextDisable"}
          to={{
            pathname: "/courses",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true },
          }}
        >
          View on XDC Explorer
        </Link>
        <center>
          {" "}
          <p style={{ color: "black", fontSize: "12px" }}> {hash} </p>
        </center>
        <Link
          className={a ? "viewOnXDCText" : "viewOnXDCTextDisable"}
          to={{
            pathname: "/courses",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true },
          }}
        >
          View on EtherScan
        </Link>
        <center>
          {" "}
          <p style={{ color: "black", fontSize: "12px" }}> {hasher} </p>{" "}
        </center>
      </div>
      {/* <center> <a href={'https://explorer.apothem.network/txs/' + hash} target='_blank' style={{ color: "black", fontSize: "5px" }}> Hi{hash} </a></center>
          <center>  <a href={'https://ropsten.etherscan.io/tx/' + hasher} target='_blank' style={{ color: "black", fontSize: "5px" }}> {hasher} </a> </center> */}
    </div>
  );
}
