import { eventConstants } from "./constant";

export const handleWallet = (data) => ({
    type: eventConstants.CONNECT_WALLET,
    payload: data,
  });