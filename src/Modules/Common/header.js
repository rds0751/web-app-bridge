import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Drawer() {
  return (
    <AppBar
      position="fixed"
      style={{
        background: "#2149B9 0% 0% no-repeat padding-box",
        height: "48px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {""}
        </Typography>
        <Button color="inherit">
          <img
            style={{ marginBottom: "19px" }}
            src="/images/wallet_header.svg"
          ></img>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
