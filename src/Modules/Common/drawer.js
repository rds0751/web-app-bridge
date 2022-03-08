import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

const drawerWidth = 240;
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
      >
        <Toolbar>
          <h4 STYLE={{ fontWeight: "bold" }}>SMARTSWAP</h4>
        </Toolbar>

        <List>
          <ListItem button component={Link} to="/about">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/bridge">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Bridge</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/swap">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Swap</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/pool">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Pool</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/market">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Market</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/history">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
