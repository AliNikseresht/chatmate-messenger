import { ChangeEvent } from "react";
import { Box } from "@mui/material";
import { useContext } from "react";

import CustomSearch from "../components/CustomSearch";
import { UserContext } from "../hooks/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);
  if (!userContext) return null;
  const { user } = userContext;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Extract value from the event
    // Handle search change here
    console.log("Search value:", value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        borderBottom: "1px solid #323232",
        p: "1em 1em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <CustomSearch
          size={265}
          borderRadios="0.7em"
          color="#424242"
          placeholder="Search messages"
          onChange={handleSearchChange}
        />
        <img
          src={user.profileImage || "/path/to/default/profile/image.jpg"}
          alt="User Profile"
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
        />
      </Box>
    </Box>
  );
};

export default Header;
