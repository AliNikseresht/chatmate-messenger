import { Modal, Typography, Button, TextField } from "@mui/material";
import React from "react";

type MentionModalProps = {
  open: boolean;
  onClose: () => void;
  onMention: (username: string) => void;
};

const MentionModal: React.FC<MentionModalProps> = ({
  open,
  onClose,
  onMention,
}) => {
  const [username, setUsername] = React.useState("");

  const handleSubmit = () => {
    onMention(username);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="mention-modal"
      aria-describedby="mention-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#022B42",
          padding: "0.7em",
          borderRadius: "8px",
          minWidth: "30rem",
          height: "15rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#c3c3c3",
        }}
      >
        <Typography variant="h6">Mention User :</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          InputLabelProps={{
            style: { color: "#c3c3c3" },
          }}
          InputProps={{
            style: { color: "#c3c3c3" },
          }}
          sx={{
            mb: 1,
            bgcolor: "#022B42",
            borderRadius: "0.7em",
            "& .MuiInputBase-input::placeholder": {
              color: "#c3c3c3",
              opacity: 1,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#c3c3c3",
              },
              "&:hover fieldset": {
                borderColor: "#004D74",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#c3c3c3",
              },
            },
            "& .MuiFormHelperText-root": {
              color: "#c1c1c1",
            },
          }}
        />
        <Button
          sx={{ width: "6rem", alignSelf: "flex-end" }}
          onClick={handleSubmit}
        >
          Mention
        </Button>
      </div>
    </Modal>
  );
};

export default MentionModal;
