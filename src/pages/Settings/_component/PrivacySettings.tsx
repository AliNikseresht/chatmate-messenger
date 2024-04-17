import {
  FormControlLabel,
  Typography,
  FormGroup,
  Switch,
  Box,
} from "@mui/material";
import React, { useState } from "react";

interface PrivacyOption {
  label: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivacySettings: React.FC = () => {
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [allowTagging, setAllowTagging] = useState(true);
  const [showActivityStatus, setShowActivityStatus] = useState(true);
  const [allowStoryReplies, setAllowStoryReplies] = useState(true);
  const [shareLastSeen, setShareLastSeen] = useState(true);
  const [twoFactorAuthentication, setTwoFactorAuthentication] = useState(false);
  const [allowSharingToStory, setAllowSharingToStory] = useState(true);

  const privacyOptions: PrivacyOption[] = [
    {
      label: "Make Profile Private",
      state: profilePrivate,
      setState: setProfilePrivate,
    },
    {
      label: "Allow Tagging in Posts",
      state: allowTagging,
      setState: setAllowTagging,
    },
    {
      label: "Show Activity Status",
      state: showActivityStatus,
      setState: setShowActivityStatus,
    },
    {
      label: "Allow Story Replies",
      state: allowStoryReplies,
      setState: setAllowStoryReplies,
    },
    {
      label: "Share Last Seen",
      state: shareLastSeen,
      setState: setShareLastSeen,
    },
    {
      label: "Two-Factor Authentication",
      state: twoFactorAuthentication,
      setState: setTwoFactorAuthentication,
    },
    {
      label: "Allow Sharing to Story",
      state: allowSharingToStory,
      setState: setAllowSharingToStory,
    },
  ];

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
        Privacy Settings
      </Typography>
      <FormGroup>
        {privacyOptions.map((option, index) => (
          <FormControlLabel
            control={
              <Switch
                checked={option.state}
                onChange={(e) => option.setState(e.target.checked)}
              />
            }
            label={option.label}
            key={index}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default PrivacySettings;
