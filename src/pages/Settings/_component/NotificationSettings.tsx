import {
  FormControlLabel,
  Typography,
  FormGroup,
  Switch,
  Box,
} from "@mui/material";
import React, { useState } from "react";

interface NotificationOption {
  label: string;
  checked: boolean;
}

const NotificationSettings: React.FC = () => {
  const [options, setOptions] = useState<NotificationOption[]>([
    { label: "Enable Email Notifications", checked: true },
    { label: "Enable Push Notifications", checked: true },
    { label: "Notify on New Followers", checked: true },
    { label: "Notify on Comments", checked: true },
    { label: "Notify on Mentions", checked: true },
  ]);

  const handleToggle = (index: number) => {
    const newOptions = [...options];
    newOptions[index].checked = !newOptions[index].checked;
    setOptions(newOptions);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        p: 4,
        maxWidth: {xs:"20.5rem", md:"45rem"},
        border: "none",
        outline: "none",
        borderRadius: "0.7em",
        bgcolor: "#022B42",
        color: "#fff",
        boxShadow: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Notification Settings
      </Typography>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Switch
                checked={option.checked}
                onChange={() => handleToggle(index)}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default NotificationSettings;
