import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./index.css";
import { useEffect } from "react";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// const ListItem = withStyles({
//   root: {
//     "&$selected": {
//       color: "white",
//       "& .MuiListItemIcon-root": {
//         color: "white",
//       },
//     },
//     "&$selected:hover": {
//       color: "white",
//       "& .MuiListItemIcon-root": {
//         color: "white",
//       },
//     },
//     "&:hover": {
//       color: "white",
//       "& .MuiListItemIcon-root": {
//         color: "white",
//       },
//     },
//   },
//   selected: {},
// })(MuiListItem);

const drawerWidth = 200;
export default function SideBar() {
  // const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };
  const [aboutIcon, setAboutIcon] = React.useState(
    "/images/noun_Home_coloured.svg"
  );
  const [bridgeIcon, setBridgeIcon] = React.useState(
    "/images/bridge_Colored.svg"
  );
  const [historyIcon, setHistoryIcon] = React.useState(
    "/images/history_Coloured.svg"
  );

  // const changeSourceForIcons = (value) => {
  //   if (value === "about") setAboutIcon("/images/noun_Home_white.svg");
  // };
  // const changeOriginalSourceForIcons = (value) => {
  //   if (value === "about") setAboutIcon("/images/noun_Home_coloured.svg");
  // };
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
        <List style={{ paddingTop: "18px" }}>
          <ListItem
            className="list-item"
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(1)}
            component={Link}
            to="/about"
          >
            <ListItemIcon>
              <img
                style={{ paddingLeft: "10px" }}
                src={
                  selectedIndex == 1
                    ? "/images/noun_Home_white.svg"
                    : "/images/noun_Home_coloured.svg"
                }
              ></img>
            </ListItemIcon>
            <ListItemText className="list-text">About</ListItemText>
          </ListItem>

          <ListItem
            className="list-item"
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(2)}
            component={Link}
            to="/bridge"
          >
            <ListItemIcon>
              <img
                style={{ paddingLeft: "10px" }}
                src={
                  selectedIndex == 2
                    ? "/images/bridge_White.svg"
                    : "/images/bridge_Colored.svg"
                }
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

          <ListItem
            className="list-item"
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(3)}
            component={Link}
            to="/history"
          >
            <ListItemIcon>
              <img
                style={{ paddingLeft: "10px" }}
                src={
                  selectedIndex == 3
                    ? "/images/history_White.svg"
                    : "/images/history_Coloured.svg"
                }
              ></img>
            </ListItemIcon>
            <ListItemText className="list-text">History</ListItemText>
          </ListItem>
        </List>
        <div style={{ position: "absolute", bottom: "0", left: "18px" }}>
          <div style={{ display: "flex", marginBottom: "11px" }}>
            {<img src="/images/Night_mode.svg"></img>}
            {<input className="footer-input" placeholder="  $USD"></input>}
          </div>
          <div style={{ marginLeft: "14px" }}>
            {
              <p className="powered">
                Powered by <img src="/images/XDC-Icon.svg"></img>&nbsp;XDC
              </p>
            }
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
