import {
  ListItemAvatar,
  ListItemText,
  Typography,
  ListItem,
  Avatar,
  Modal,
  Card,
  List,
} from "@mui/material";
import React from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  boxShadow: 24,
  height: "30rem",
  outline: "none",
  overflowY: "scroll",
  borderRadius: "0.7em",
  bgcolor: "#022B42",
  color: "#c3c3c3",
} as const;

type User = {
  name: string;
  username: string;
  avatar: string;
};

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
  usersToShare: User[];
  onShare: (user: User) => void;
};

const ShareModal: React.FC<ShareModalProps> = ({
  open,
  onClose,
  usersToShare,
  onShare,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="share-modal-title"
    sx={{ overflowY: "scroll" }}
  >
    <Card sx={modalStyle}>
      <Typography
        id="share-modal-title"
        variant="h6"
        component="h2"
        sx={{
          position: "sticky",
          top: "0",
          bgcolor: "#022B42",
          zIndex: "99",
          p: "0.8em",
          opacity: "0.97",
          borderBottom: "1px solid #004D74",
        }}
      >
        Share Post
      </Typography>
      <List>
        {usersToShare.map((userToShare, index) => (
          <ListItem button onClick={() => onShare(userToShare)} key={index}>
            <ListItemAvatar>
              <Avatar src={userToShare.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={userToShare.name}
              secondary={`${userToShare.username}`}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  </Modal>
);

export default ShareModal;
