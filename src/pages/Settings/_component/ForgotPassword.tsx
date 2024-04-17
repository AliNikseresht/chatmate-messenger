import {
  CircularProgress,
  LinearProgress,
  Typography,
  TextField,
  Snackbar,
  Button,
  Alert,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordStrengthMeter = (props: { score: number }) => {
  const { score } = props;
  const getColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "error.main";
      case 2:
        return "warning.main";
      case 3:
        return "info.main";
      case 4:
        return "success.main";
      default:
        return "grey.500";
    }
  };

  const getText = (score: number) => {
    switch (score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Unknown";
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <LinearProgress
        variant="determinate"
        value={(score / 4) * 100}
        sx={{ height: 10, borderRadius: 5, bgcolor: getColor(score) }}
      />
      <Typography variant="body2" textAlign="right" color="#fff">
        {getText(score)}
      </Typography>
    </Box>
  );
};

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<PasswordChangeFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "newPassword") {
      let strength = 0;
      const lengthRequirement = value.length >= 8 && value.length <= 14;
      const lowerCase = /[a-z]/.test(value);
      const upperCase = /[A-Z]/.test(value);
      const number = /[0-9]/.test(value);
      const specialChar = /[^A-Za-z0-9]/.test(value);

      if (lengthRequirement) strength += 1;
      if (lowerCase) strength += 1;
      if (upperCase) strength += 1;
      if (number) strength += 1;
      if (specialChar) strength += 1;

      // Ensure strength is capped at 4 for the meter to work correctly
      strength = Math.min(strength, 4);

      setPasswordStrength(strength);
    }
  };

  const canSaveNewPassword = (): boolean => {
    const isValidLength =
      formData.newPassword.length >= 8 && formData.newPassword.length <= 14;
    return (
      formData.currentPassword.length > 0 &&
      formData.newPassword === formData.confirmPassword &&
      passwordStrength > 2 &&
      isValidLength
    );
  };

  const handleSaveNewPassword = async () => {
    // Replace this with your actual logic for saving the new password
    if (!canSaveNewPassword()) {
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true); // Start loading indicator
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("New password saved:", formData.newPassword);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStrength(0);
      setSnackbarOpen(true);
      setTimeout(() => navigate("/edit-profile"), 3000);
    } catch (error) {
      // Handle errors, such as displaying a message to the user
      console.error("Failed to save new password:", error);
    } finally {
      setLoading(false); // Stop loading indicator
      setSnackbarOpen(true); // Show success message
    }
  };

  const marginForForgotPassword =
    location.pathname === "/forgot-password" ? "5.5em" : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: {xs:"1em", md:"2em"},
        borderRadius: "0.7em",
        maxWidth: "45rem",
        margin: "auto",
        bgcolor: "#032030",
        mt: marginForForgotPassword,
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "600",
          textAlign: "center",
          fontSize:{xs:"1.5rem", md:"2.5rem"}
        }}
      >
        Change Password
      </Typography>
      <TextField
        name="currentPassword"
        type="password"
        placeholder="Current Password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.currentPassword}
        sx={{ mb: 2, bgcolor: "#aa9f99", borderRadius: "0.7em" }}
      />
      <TextField
        name="newPassword"
        type="password"
        placeholder="New Password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.newPassword}
        inputProps={{ maxLength: 14 }}
        sx={{ mb: 2, bgcolor: "#aa9f99", borderRadius: "0.7em" }}
      />
      <TextField
        name="confirmPassword"
        type="password"
        placeholder="Confirm New Password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.confirmPassword}
        sx={{ mb: 2, bgcolor: "#aa9f99", borderRadius: "0.7em" }}
      />
      <PasswordStrengthMeter score={passwordStrength} />
      <Button
        variant="contained"
        onClick={handleSaveNewPassword}
        disabled={loading || !canSaveNewPassword()}
        fullWidth
        sx={{ mt: 2, color: "#fff", position: "relative", height: "40px" }}
      >
        {loading ? (
          <CircularProgress
            size={24}
            sx={{
              color: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        ) : (
          "Save New Password"
        )}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your password has been changed successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
