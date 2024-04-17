import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BottomNavigation from "@mui/material/BottomNavigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import * as React from "react";

export default function MobileMenu() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(event);
    
  };

  const handleNavigation = (page: string) => {
    navigate(`/${page}`);
  };  

    return (
      <BottomNavigation
        sx={{ 
          width: "100%",
          height:"5rem",
         display: { xs: "flex", lg: "none" },
          position:"sticky", 
          bottom:"-0.1em",
          bgcolor:"#022b42" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label={<span>Home</span>}
          value="Home"
          icon={<HomeIcon sx={{fontSize:"1.8rem"}}/>}
          sx={{ minWidth: "40px",color:"#c3c3c3" }}
          onClick={() => handleNavigation("")}
        />
        <BottomNavigationAction
          label={<span>Explore</span>}
          value="Explore"
          icon={<TravelExploreIcon sx={{fontSize:"1.8rem"}}/>}
          sx={{ minWidth: "40px" ,color:"#c3c3c3" }}
          onClick={() => handleNavigation("explore")}
        />
        <BottomNavigationAction
          label={<span>Create</span>}
          value="Create"
          icon={<AddCircleIcon sx={{fontSize:"1.8rem"}}/>}
          sx={{ minWidth: "40px",color:"#c3c3c3"  }}
          onClick={() => handleNavigation("create")}
        />
        <BottomNavigationAction
          label={<span style={{ fontSize: "0.8rem" }}>Notification</span>}
          value="Notification"
          icon={<FavoriteIcon sx={{fontSize:"1.8rem"}}/>}
          sx={{ minWidth: "40px",color:"#c3c3c3"  }}
          onClick={() => handleNavigation("notifications")}
        />
        <BottomNavigationAction
          label={<span>Profile</span>}
          value="Profile"
          icon={<AccountCircleIcon sx={{fontSize:"1.8rem"}}/>}
          sx={{ minWidth: "40px",color:"#c3c3c3"  }}
          onClick={() => handleNavigation("profile")}
        />
      </BottomNavigation>
    );
}
