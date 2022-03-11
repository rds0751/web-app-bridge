import * as React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";

export default function About() {
  return (
    <div>
      <Box
        className="content-box"
        display="grid"
        alignItems="center"
        justifyContent="center"
      >
        <h2>Welcome to SmartSwap</h2>
        <Button className="connect-wallet" variant="primary">
        <img src='/images/wallet.svg'></img>
          Connect Wallet
        </Button>{" "}
      </Box>
      <Grid item xs={12} style={{ marginTop: "52px" }}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Paper
              sx={{
                height: 327,
                width: 230,
              }}
              className="card-paper"
            >
              <img src="/images/Swap (1).svg" alt="swap"></img>
              <p className="p-heading">BRIDGE</p>
              <p className="p-subheading">Transfer data (e.g. digital asset ownership information) between two chains</p>
            </Paper>
          </Grid>

          <Grid item>
            <Paper
              sx={{
                height: 327,
                width: 230,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
              className="card-paper"
            >
              <img src= "/images/Swap (1).svg" alt="swap"></img>
              <p className="p-heading">SWAP</p>
              <p className="p-subheading">Swap tokens supported on XDC Network</p>
            </Paper>
          </Grid>

          <Grid item>
            <Paper
              sx={{
                height: 327,
                width: 230,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
              className="card-paper"
            >
              <img src= "/images/pool.svg" alt="swap"></img>
              <p className="p-heading">POOL</p>
              <p className="p-subheading">Add your token pair to the pool and earn whenever there is a swap</p>
            </Paper>
          </Grid>

          <Grid item>
            <Paper
              sx={{
                height: 327,
                width: 230,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
              className="card-paper"
            >
              <img src= "/images/market.svg" alt="swap"></img>
              <p className="p-heading">Market</p>
              <p className="p-subheading">Analyse the top performing tokens and pairs</p>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
