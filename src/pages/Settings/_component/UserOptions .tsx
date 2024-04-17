import { Box, List, ListItem, ListItemText, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";
import ForgotPassword from "./ForgotPassword";
import ConfirmDialog from "./ConfirmDialog";

interface Option {
  title: string;
  component: React.ReactNode;
}

interface OptionModalProps {
  open: boolean;
  onClose: () => void;
  option: Option;
}

const options: Option[] = [
  { title: "Notifications", component: <NotificationSettings /> },
  { title: "Change Password", component: <ForgotPassword /> },
  { title: "Privacy Settings", component: <PrivacySettings /> },
  { title: "Log Out", component: "" },
];

const OptionModal: React.FC<OptionModalProps> = ({ open, onClose, option }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      sx={{
        bgcolor: "transparent",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: {xs:"20.5rem", md:"45rem"},
        maxHeight: "84%",
        boxShadow: 0,
        border: "none",
        outline: "none",
        borderRadius: "0.7em",  
        color: "#fff",
      }}
    >
      {option.component}
    </Box>
  </Modal>
);

const UserOptions: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleItemClick = (option: Option) => {
    if (option.title === "Log Out") {
      setConfirmOpen(true);
    } else {
      setSelectedOption(option);
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setConfirmOpen(false);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "22rem",px:"0.5em" }}>
      <List sx={{ width: "100%", borderRadius: "0.7em", color: "#c3c3c3" }}>
        {options.map((option, index) => (
          <ListItem
            button
            key={index}
            sx={{
              justifyContent: "center",
              my: "0.5em",
              backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 150.56%)",
              py: "0.73em",
              borderRadius: "0.5em",
              
            }}
            onClick={() => handleItemClick(option)}
          >
            <ListItemText
              primary={option.title}
              sx={{ textAlign: "center", color: "#c3c3c3", }}
            />
          </ListItem>
        ))}
      </List>
      {selectedOption && (
        <OptionModal
          open={modalOpen}
          onClose={handleClose}
          option={selectedOption}
        />
      )}
      <ConfirmDialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        onConfirm={handleLogout}
        title="Log Out"
        content="Are you sure you want to log out?"
      />
    </Box>
  );
};

export default UserOptions;
