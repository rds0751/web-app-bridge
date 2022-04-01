import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../Common/header";
import SideBar from "../Common/drawer";
import HistoryCard from "./HistoryDetails";

export default function HistoryDetails() {
  return (
    <Box>
      <Header />
      <SideBar />
      <HistoryCard />
    </Box>
  );
}
