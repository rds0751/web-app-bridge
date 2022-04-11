import React, { useState, useEffect } from "react";
// import toast from 'react-toastify';
import { toast } from 'react-toastify';
import XDC3 from "xdc3";
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import xdc3 from "../../utils/xdc3";
import Web3 from "web3";
import token from "../../utils/xtoken";
import { Link, useLocation } from "react-router-dom";
import xbridge from "../../utils/xbridge";
import tokenList from '../../contracts/tokenlist.json'
import Bridge from "../../contracts/Gate.json"
import Deploy from "../../contracts/deployer.json";
import DeBridgeGateJson from "../../contracts/Gate.json";
import { TailSpin } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import "react-step-progress/dist/index.css";
import ebridge from "../../utils/ebridge";
import { tokenBridge, tokenDeployee, eBridgeAddress, deployee, xBridgeAddress } from '../../common/constant';
let debridgeId, submissionId, signatures, abc, transactionHash, tx, allowance, amount, transactionHashes, bcd, cde, transaction;

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

  toast.configure()



  const OnSubmit = async () => {


    let account
    //connecting to the xdc testnetwork using chain_id
    await window.web3.eth.getAccounts((err, accounts) => {
      if (err !== null) console.error("");
      else if (accounts.length === 0) {
        account = false;
      } else {
        // console.log("Account",accounts);
        account = true;
      }
    })
      ;


    console.log(" ", location.state.selectedOptionToken.address);
    //creating a object using getAccounts
    const accounts = await xdc3.eth.getAccounts();
    console.log("accounts", accounts[0]);
    console.log(" Destination", '3');
    console.log("", location.state.selectedOptionToken.address);

    /**
     * @dev Performing the Approve method for erc20 .
     * @param address Reciever Address.
     * @param amount token should be appr oved to the reciever address
     * @param account[0] sender address.
     * @param data passing the approve method wih reciever address and amount
     */


    toast.info('Sending the Amount.');

    if (location.state.selectedOptionToken.chainId === 50) {
      console.log("nonu");
      transaction = {
        from: accounts[0],
        to: xBridgeAddress, //contractAddress of the concerned token (same in data below)
        value: xdc3.utils.toWei(location.state.amount), // token _amount
        data: xbridge.methods.send(
          location.state.selectedOptionToken.address,//address _tokenAddress,
          xdc3.utils.toWei(location.state.amount), // token _amount
          3,// _chainIdTo
          accounts[0], //_receiver
          "0x", // _permit
          false, //_useAssetFee
          0, //_referralCode  
          "0x" //_autoParams
        ).encodeABI()
        //value given by user should be multiplied by 1000
      };
      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, result) {
          if (result && confirmationNumber === 1) {
            transactionHash = result.transactionHash;
            console.log("transactinsnsns", transactionHash);

          }

        });
    }

    if (location.state.selectedOptionToken.chainId === 1) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      const web3 = new Web3(window.ethereum);
      const bridgeAddress = eBridgeAddress;
      const ebridge = new web3.eth.Contract(Bridge.abi, bridgeAddress);
      transaction = {
        from: accounts[0],
        to: eBridgeAddress, //contractAddress of the concerned token (same in data below)
        value: xdc3.utils.toWei(location.state.amount), // token _amount
        data: ebridge.methods.send(
          location.state.selectedOptionToken.address,//address _tokenAddress,
          xdc3.utils.toWei(location.state.amount), // token _amount
          51,// _chainIdTo
          accounts[0], //_receiver
          "0x", // _permit
          false, //_useAssetFee
          0, //_referralCode  
          "0x" //_autoParams
        ).encodeABI()
        //value given by user should be multiplied by 1000
      };

      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, result) {
          if (result && confirmationNumber === 1) {
            transactionHash = result.transactionHash;
            console.log("transactinsnsns", transactionHash);
            console.log("abcs", location.state.selectedOptionToken.debridgeAddress)

          }

        });
    }


    if (location.state.selectedOptionToken.chainId === 51) {

      let transaction = {
        from: accounts[0],
        to: location.state.selectedOptionToken.address, //contractAddress of the concerned token (same in data below)
        data: token.methods.approve(xBridgeAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

        ).encodeABI()
        //value given by user should be multiplied by 1000
      };


      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, receipt) {
          if (receipt && confirmationNumber === 1) {
            console.log("transaction hash ", receipt.transactionHash);



          }

        });




    }
    else if (location.state.selectedOptionToken.chainId === 3) {

      let transaction = {
        from: accounts[0],
        to: location.state.selectedOptionToken.address, //contractAddress of the concerned token (same in data below)
        data: token.methods.approve(eBridgeAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

        ).encodeABI()
        //value given by user should be multiplied by 1000
      };
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      const web3 = new Web3(window.ethereum);
      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, receipt) {
          if (receipt && confirmationNumber === 1) {
            console.log("transaction hash ", receipt.transactionHash);



          }
        });
    }


    allowance = parseInt(await token.methods.allowance('0xdcdde99d5a90446cfac723f1b685c04244a31a5f', xBridgeAddress).call())
    console.log("allowaNCE", allowance, location.state.amount);

    setProgress(progress + 30)
    letToggle();

    if (location.state.selectedOptionToken.chainId === 51) {
      transaction = {
        from: accounts[0],
        to: xBridgeAddress, //contractAddress of the concerned token (same in data below)
        gas: 150000,
        value: xdc3.utils.toWei("0.01"), // token _amount
        data: xbridge.methods.send(
          location.state.selectedOptionToken.address,//address _tokenAddress,
          xdc3.utils.toWei(location.state.amount), // token _amount
          3,// _chainIdTo
          accounts[0], //_receiver
          "0x", // _permit
          false, //_useAssetFee
          0, //_referralCode  
          "0x" //_autoParams
        ).encodeABI()
        //value given by user should be multiplied by 1000
      };
      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, result) {
          if (result && confirmationNumber === 1) {
            transactionHash = result.transactionHash;
            console.log("transactinsnsns", transactionHash);

          }

        });
    }
    if (location.state.selectedOptionToken.chainId === 3) {
      window.web3 = new Web3(window.ethereum);
      const web3 = new Web3(window.ethereum);
      const bridgeAddress = eBridgeAddress;
      const ebridge = new web3.eth.Contract(Bridge.abi, bridgeAddress);
      transaction = {
        from: accounts[0],
        to: eBridgeAddress, //contractAddress of the concerned token (same in data below)
        gas: 1500000,
        value: xdc3.utils.toWei("0.01"), // token _amount
        data: ebridge.methods.send(
          location.state.selectedOptionToken.address,//address _tokenAddress,
          xdc3.utils.toWei(location.state.amount), // token _amount
          51,// _chainIdTo
          accounts[0], //_receiver
          "0x", // _permit
          false, //_useAssetFee
          0, //_referralCode  
          "0x" //_autoParams
        ).encodeABI()
        //value given by user should be multiplied by 1000
      };
      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, result) {
          if (result && confirmationNumber === 1) {
            transactionHash = result.transactionHash;
            console.log("transactinsnsns", transactionHash);

          }

        });

    }


    setProgress(progress + 65)
    letToggle();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": transactionHash })
    };
    let var1 = 0;
    while (var1 == 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id": transactionHash })
      };
      await fetch('https://testapi.xdcbridge.com', requestOptions)
        .then(response => response.json())
        .then(data => { abc = data });
      console.log(abc.status)
      if (abc.status != 0) {
        var1 = 1;
      }
    };


    console.log("transaction hash", transactionHash);

    setSecoundStatus('The')



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
    setProgress(progress + 70)

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
    console.log(" Destination", '3');
    const isSubmissionUsed = await ebridge.methods.isSubmissionUsed(submissionId).call();
    const debridge_id = await ebridge.methods.getDebridgeId(location.state.selectedOptionToken.chainId, tokenBridge).call();

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
    const autoParamsFrom = await _packSubmissionAutoParamsFrom(web3, accounts[0], '0x');

    /**
    * @dev Performing the ERC20 claim function.
    * @param debridge_id The address of the token.
    * @param amount Token should be claim from the reciever
    * @param chain_id To chain ID
    * @param address To Address
    * @param submissionId Submission id contains :- nonce, id , address
    * @param signature to verify the contract
    */

    if (location.state.selectedOptionToken.chainId === 1) {
 console.log("jnckjdznibnc")
      window.web3 = new XDC3(window.xdc);
      const xdc3 = new XDC3(window.xdc);

      transaction = {

        from: accounts[0],
        to: xBridgeAddress, //contractAddress of the concerned token (same in data below)
        value: '0',
        data: xbridge.methods.claim(
          location.state.selectedOptionToken.debridgeAddress,
          amount,
          '3',
          accounts[0],
          submissionId,
          signatures,
          autoParamsFrom

        ).encodeABI()
        //value given by user should be multiplied by 1000
      };


       window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, receipt) {
          if (receipt && confirmationNumber === 1) {
            transactionHashes = receipt.transactionHash;
            console.log("Transaction", transactionHashes)
            
            setHasher(transactionHashes);
          }
        });


    }
    console.log("sjhkszhfkszehku")
   
    setProgress(progress + 100)

    console.log("", location.state.selectedOptionToken.chainId)
    if (location.state.selectedOptionToken.chainId === 3) {
      transaction = {
        from: accounts[0],
        to: xBridgeAddress, //contractAddress of the concerned token (same in data below)
        value: '0',
        data: xbridge.methods.claim(
          location.state.selectedOptionToken.debridgeAddress,
          amount,
          location.state.selectedOptionToken.chainId,
          accounts[0],
          submissionId,
          signatures,
          autoParamsFrom

        ).encodeABI()
        //value given by user should be multiplied by 1000
      };


      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, receipt) {
          if (receipt && confirmationNumber === 1) {
            transactionHash = receipt.transactionHash;
            console.log("Transaction", transactionHash)
          }
        });
    }

    else {
      transaction = {
        from: accounts[0],
        to: eBridgeAddress, //contractAddress of the concerned token (same in data below)
        data: ebridge.methods.claim(
          location.state.selectedOptionToken.debridgeAddress,
          amount,
          location.state.selectedOptionToken.chainId,
          accounts[0],
          submissionId,
          signatures,
          autoParamsFrom,
          // _token
        ).encodeABI()
        //value given by user should be multiplied by 1000
      };

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      const web3 = new Web3(window.ethereum);
      await window.web3.eth
        .sendTransaction(transaction)
        .on("confirmation", function (confirmationNumber, receipt) {
          if (receipt && confirmationNumber === 1) {
            transactionHashes = receipt.transactionHash;
            console.log("Transaction", transactionHashes);
            setHasher(transactionHashes);


          }
        });
    }


    setProgress(progress + 100)
    letToggle();
    console.log("", submissionId);

    setHasher(transactionHashes);



    /**
     *@dev Retrning the hash.
    * @param web3 Librabry.
    * @param autoParams autoparam
    * @returns return the successfull hash value
    */
    async function _packSubmissionAutoParamsFrom(web3, nativeSender, autoParams) {
      if (autoParams !== '0x' && autoParams !== '') {
        const decoded = web3.eth.abi.decodeParameters(
          ['tuple(uint256,uint256, bytes, bytes)'], autoParams
        );
        console.log(`autoParams: ${autoParams}, decoded: ${decoded}`);
        const encoded = web3.eth.abi.encodeParameter(
          'tuple(uint256,uint256, address, bytes, bytes)',
          [decoded[0][0], decoded[0][1], decoded[0][2], decoded[0][3], nativeSender]
        );
        console.log(`encoded: ${encoded}`);
        return encoded;
      }
      return '0x';
    }

  };


  useEffect(() => {
    OnSubmit();
  }, [])

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
      setShowHideImage("flex");
      setSpinnerLoading(false);
      setProgressText("Transferd your assests");
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
                style={{ borderWidth: "2px" }}
                className={`indexedStep ${accomplished ? "accomplished" : null
                  }`}
              >
                {index + 1}
              </div>
              <div className={"test"}>Approve</div>
            </>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <>
              <div
                className={`indexedStep ${accomplished ? "accomplished" : null
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
                className={`indexedStep ${accomplished ? "accomplished" : null
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
                className={`indexedStep ${accomplished ? "accomplished" : null
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
        <center> <a href={location.state.selectedOptionToken.logoURI + hash} target='_blank' style={{ color: "black", fontSize: "5px" }}> {hash} </a></center>

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
        <center>  <a href={location.state.selectedOptionToken.logoURI + hasher} target='_blank' style={{ color: "black", fontSize: "5px" }}> {hasher} </a> </center>
        {/* <Button onClick={() => letToggle()} className="done-button margintp">
            Done
          </Button> */}
      </div>
      {/* <center> <a href={'https://explorer.apothem.network/txs/' + hash} target='_blank' style={{ color: "black", fontSize: "5px" }}> Hi{hash} </a></center>
          <center>  <a href={'https://ropsten.etherscan.io/tx/' + hasher} target='_blank' style={{ color: "black", fontSize: "5px" }}> {hasher} </a> </center> */}
    </div>
  );
}