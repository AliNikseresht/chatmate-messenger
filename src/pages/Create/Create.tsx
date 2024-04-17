import { Box, Snackbar, Alert } from "@mui/material";
import { useState } from "react";

import PostBox from "./_component/PostBox";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

const CreatePost = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handlePostBoxData = (postData: SnackbarState) => {
    setSnackbar(postData);
  };

  return (
    <Box
      sx={{
        width: "99.8%",
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "transparent",
        backgroundImage:"none",
        boxShadow:"0",
        borderRadius: "0.7em",
      }}
    >
      <PostBox handlePostData={handlePostBoxData} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatePost;
