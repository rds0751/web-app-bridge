import web3 from './web3';
import Bridge from "../contracts/Gate.json";
import { eBridgeAddress } from '../common/constant';

const bridgeAddress = eBridgeAddress;
const ebridge = new web3.eth.Contract(Bridge.abi, bridgeAddress);

export default ebridge;