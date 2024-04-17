import { Box } from "@mui/material";

import GlobalScrollbarStyles from "../../components/GlobalScrollbarStyles ";
import EditProfile from "./_component/EditProfile";

const Setting = () => {
  return (
    <Box
      sx={{
        width: "99.8%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "transparent",
        backgroundImage:"none",
        boxShadow:"0",
        borderRadius: "0.7em",
        height:"100vh"
      }}
    >
      <GlobalScrollbarStyles />
      <EditProfile />
    </Box>
  );
};

export default Setting;
