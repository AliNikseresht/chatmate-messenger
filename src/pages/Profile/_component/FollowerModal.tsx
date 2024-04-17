import {
  IconButton,
  Typography,
  Avatar,
  Button,
  Modal,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmationDialog from "./ConfirmationDialog";
import { User } from "../../../types/models";

interface SimpleModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  users: User[];
  onRemove?: (id: number) => void;
  onFollowToggle?: (id: number) => void;
}

const FollowerModal: React.FC<SimpleModalProps> = ({
  open,
  handleClose,
  title,
  content,
  users,
  onRemove,
  onFollowToggle,
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<number | null>(null);
  const [followConfirmationOpen, setFollowConfirmationOpen] = useState(false);
  const [userToToggleFollow, setUserToToggleFollow] = useState<number | null>(
    null
  );

  const handleConfirmationOpen = (id: number) => {
    setUserToRemove(id);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setUserToRemove(null);
    setConfirmationOpen(false);
  };

  const handleConfirmRemove = () => {
    if (userToRemove !== null && onRemove) {
      onRemove(userToRemove);
    }
    handleConfirmationClose();
  };

  const handleFollowConfirmationOpen = (id: number) => {
    setUserToToggleFollow(id);
    setFollowConfirmationOpen(true);
  };

  const handleFollowConfirmationClose = () => {
    setUserToToggleFollow(null);
    setFollowConfirmationOpen(false);
  };

  const handleConfirmFollow = () => {
    if (userToToggleFollow !== null && onFollowToggle) {
      onFollowToggle(userToToggleFollow);
    }
    handleFollowConfirmationClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div>
<Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: {xs:"20rem", md:"45rem"},
    maxHeight: "100%",
    overflowY: "auto",
    boxShadow: 24,
    p: "2em",
    border: "none",
    outline: "none",
    borderRadius: "0.7em",
    bgcolor: "#022B42",
    color: "#fff",
  }}
>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-description">{content}</Typography>
          <Box sx={{ mt: 2, overflowY: "scroll", height: "12.5rem" }}>
            {users.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={user.avatar} alt={user.name} sx={{ mr: 2 }} />
                  <Link
                    to={`/profile/${user.id}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <Typography>{user.name}</Typography>
                  </Link>
                </Box>
                {title === "Followers" ? (
                  <Button
                    sx={{ color: "#006DA4" }}
                    onClick={() => handleConfirmationOpen(user.id)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    sx={{ color: "#006DA4" }}
                    onClick={() => handleFollowConfirmationOpen(user.id)}
                  >
                    Following
                  </Button>
                )}
              </Box>
            ))}
            <Box sx={{ my: "5em", textAlign: "center" }}>
              {title === "Followers" && users.length === 0 && (
                <Typography variant="body1">
                  You have no followers yet.
                </Typography>
              )}
              {title === "Following" && users.length === 0 && (
                <Typography variant="body1">
                  You are not following anyone yet.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <ConfirmationDialog
          open={confirmationOpen}
          onClose={handleConfirmationClose}
          onConfirm={handleConfirmRemove}
          title="Confirmation"
          message="Are you sure you want to remove this follower?"
        />
        <ConfirmationDialog
          open={followConfirmationOpen}
          onClose={handleFollowConfirmationClose}
          onConfirm={handleConfirmFollow}
          title="Confirmation"
          message="Are you sure you want to unfollow this following?"
        />
      </div>
    </Modal>
  );
};

export default FollowerModal;
