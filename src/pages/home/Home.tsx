import { useContext, useEffect, useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { useLocation } from "react-router-dom";

import GlobalScrollbarStyles from "../../components/GlobalScrollbarStyles ";
import { UserContext } from "../../hooks/UserContext";
import NewPost from "../Create/_component/NewPost";
import Story from "./_component/Story";

const Home = () => {
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setOpenSnackbar(true);
    }
  }, [location]);

  if (!userContext) {
    return <Box>Error: User context not found!</Box>;
  }
  const { user } = userContext;

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
        height: "100vh",
      }}
    >
      <GlobalScrollbarStyles />
      <Box
        sx={{
          width: "100%",
          maxWidth: "74rem",
          position: "sticky",
          top: "0",
          zIndex: "99",
        }}
      >
        <Story />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowY: "scroll",
          borderTop:"1px solid #004D74"
        }}
      >
        <NewPost
          user={{
            name: user.name,
            username: user.username,
            avatar: user.profileImage || "/path/to/default/avatar.jpg",
          }}
          retweets={23}
          image="/path/to/image.jpg"
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
