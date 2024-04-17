import { Avatar, Box } from "@mui/material";

import Logo from "../../public/splash-logo.png";

const Splash = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#032030",
      }}
    >
      <Avatar src={Logo} alt="logo-app" sx={{width:{xs:"100%", sm:"auto"}, height:{xs:"40%", sm:"auto"}, objectFit:"cover"}} />
    </Box>
  );
};

export default Splash;
