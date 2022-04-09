import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./index.css";

const drawerWidth = 200;
export default function SideBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        className="drawer-content"
      >
        <div>
          <Toolbar>
            <img
              style={{ width: "134px", height: "26px", marginLeft: "7px" }}
              src="/images/Logo.svg"
            ></img>{" "}
          </Toolbar>
        </div>
        <List>
          <ListItem className="list-item" button component={Link} to="/about">
            <ListItemIcon>
              <img
                style={{ paddingLeft: "10px" }}
                src="/images/noun_Home_3874019.svg"
              ></img>
            </ListItemIcon>
            <ListItemText className="list-text">About</ListItemText>
          </ListItem>

          <ListItem className="list-item" button component={Link} to="/bridge">
            <ListItemIcon>
              <img
                style={{ paddingLeft: "10px" }}
                src="/images/BridgeWhite.svg"
              ></img>
            </ListItemIcon>
            <ListItemText className="list-text">Bridge</ListItemText>
          </ListItem>

          {/* <ListItem className="list-item" button component={Link} to="/swap">
            <ListItemIcon>
            <img src="/images/swap2.svg"></img>
            </ListItemIcon>
            <ListItemText className="list-text">Swap</ListItemText>
          </ListItem>

          <ListItem className="list-item" button component={Link} to="/pool">
            <ListItemIcon>
            <img src="/images/earn2.svg"></img>
            </ListItemIcon>
            <ListItemText className="list-text">Pool</ListItemText>
          </ListItem>

          <ListItem className="list-item" button component={Link} to="/market">
            <ListItemIcon>
            <img src="/images/chart.svg"></img>
            </ListItemIcon>
            <ListItemText className="list-text">Market</ListItemText>
          </ListItem> */}

          <ListItem className="list-item" button component={Link} to="/history">
            <ListItemIcon>
              <img
                style={{ paddingLeft: "10px" }}
                src="/images/history (1).svg"
              ></img>
            </ListItemIcon>
            <ListItemText className="list-text">History</ListItemText>
          </ListItem>
        </List>
        <div style={{ position: "absolute", bottom: "0", left: "18px" }}>
          <div style={{ display: "flex", marginBottom: "11px" }}>
            <img src="/images/Night mode.svg"></img>
            <input className="footer-input" placeholder="$USD"></input>
          </div>
          <div>
            <p className="powered">Powered by:&nbsp;XDC</p>
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
