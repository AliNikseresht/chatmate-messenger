import {
  CardHeader,
  IconButton,
  Typography,
  MenuItem,
  Snackbar,
  Avatar,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

type PostHeaderProps = {
  user: {
    avatar: string;
    name: string;
    username: string;
  };
  post: {
    id: string;
    location?: string;
  };
  anchorEl: HTMLElement | null;
  handleMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => void;
  handleMenuClose: () => void;
  handleDelete: () => void;
  handleEdit: (postId: string, content: string) => void;
  handleArchive: () => void;
  handleMention: () => void;
  openSnackbar: boolean;
  snackbarMessage: string;
  setOpenSnackbar: (value: boolean) => void;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  post,
  anchorEl,
  handleMenuClick,
  handleMenuClose,
  handleDelete,
  handleEdit,
  handleArchive,
  handleMention,
  openSnackbar,
  snackbarMessage,
  setOpenSnackbar,
}) => (
  <CardHeader
    avatar={
      <Avatar
        sx={{ width: "70px", height: "70px" }}
        aria-label="user-avatar"
        src={user.avatar}
      >
        {user.name[0]}
      </Avatar>
    }
    action={
      <>
        <IconButton
          sx={{ color: "#fff" }}
          aria-label="settings"
          onClick={(e) => handleMenuClick(e, post.id)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={() => handleEdit(post.id, "new content")}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleArchive}>Archive</MenuItem>
          <MenuItem onClick={handleMention}>Mention</MenuItem>
        </Menu>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </>
    }
    title={
      <Typography color="#fff" fontSize="1.6rem" textTransform="capitalize">
        {user.username}
      </Typography>
    }
    subheader={
      <>
        <Typography sx={{ fontSize: "1rem", color: "#c3c3c3" }}>
          {post.location}
        </Typography>
      </>
    }
  />
);

export default PostHeader;
