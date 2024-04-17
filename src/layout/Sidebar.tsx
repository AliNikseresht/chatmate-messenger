import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  AddBox as AddBoxIcon,
  Email as EmailIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

import Logo from "../../public/sidbar-logo.png";

const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
borderRight:"1px solid #004D74",
        alignItems: "flex-start",
        width: "22%",
        padding: "0.7em 1em",
        position: "sticky",
        top: 0,
        borderEndEndRadius: "0.7em",
        borderTopRightRadius: "0.7em",
      }}
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo-app"
          style={{ width: "90%", margin: "0.5em 0.8em" }}
        />
      </Link>
      <List sx={{ width: "100%" }}>
        {[
          "Home",
          "Explore",
          "Create",
          "Notifications",
          "Messages",
          "Profile",
          "Settings",
          "Logout",
        ].map((text, index) => {
          const path =
            index === 0
              ? "/"
              : index === 8
              ? "/profile"
              : `/${text.toLowerCase()}`;
          return (
            <ListItem
              button
              component={Link}
              to={path}
              key={text}
              selected={selected === path}
              onClick={() => setSelected(path)}
              sx={{
                borderRadius: "0.7em",
                bgcolor: selected === path ? "#fff" : "inherit",
                color: selected === path ? "#006494" : "#fff",
                "&:hover": {
                  bgcolor: "#006DA4",
                  color: "#fff",
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
                "& .MuiListItemIcon-root": {
                  color: selected === path ? "#006494" : "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                {index === 0 && <HomeIcon fontSize="large" />}
                {index === 1 && <SearchIcon fontSize="large" />}
                {index === 2 && <AddBoxIcon fontSize="large" />}
                {index === 3 && <NotificationsIcon fontSize="large" />}
                {index === 4 && <EmailIcon fontSize="large" />}
                {index === 5 && <AccountBoxIcon fontSize="large" />}
                {index === 6 && <SettingsIcon fontSize="large" />}
                {index === 7 && <LogoutIcon fontSize="large" />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
