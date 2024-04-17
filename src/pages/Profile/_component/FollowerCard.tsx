import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  Button,
  Dialog,
  Stack,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../../hooks/UserContext";
import { usePosts } from "../../../hooks/PostContext";
import data from "../../../../Data/userData.json";
import { User } from "../../../types/models";
import FollowerModal from "./FollowerModal";

const followers = data.followers;
const followings = data.followings;

function formatNumber(number: number): string {
  if (number > 9999) {
    return `${(number / 1000).toFixed(1)}k`;
  } else {
    return number.toString();
  }
}

const FollowerCard = () => {
  const { posts } = usePosts();
  const [followerUsers, setFollowerUsers] = useState<User[]>(followers);
  const [followingUsers, setFollowingUsers] = useState<User[]>(followings);
  const [followersModalOpen, setFollowersModalOpen] = useState<boolean>(false);
  const [followingModalOpen, setFollowingModalOpen] = useState<boolean>(false);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  const userContext = useContext(UserContext);
  if (!userContext) return null;
  const { user } = userContext;

  const handleAvatarClick = () => {
    setAvatarDialogOpen(true);
  };

  const handleCloseAvatarDialog = () => {
    setAvatarDialogOpen(false);
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.download = "profile_image.jpg";
    link.href = user.profileImage || "/path/to/default/profile/image.jpg";
    link.click();
  };

  const handleRemove = (userId: number) => {
    setFollowerUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  const handleFollowToggle = (userId: number) => {
    setFollowingUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        // flexWrap:"wrap"
      }}
    >
      <Avatar
        src={user.profileImage || "/path/to/default/profile/image.jpg"}
        sx={{
          marginRight: 2,
          width:{xs:"90px",sm:"95px", md:"150px"},
          height:{xs:"90px",sm:"95px", md:"150px"},
          cursor: "pointer",
          mb:{xs:"1em", md:"0"}
        }}
        onClick={handleAvatarClick}
      />
      <Dialog
        open={avatarDialogOpen}
        onClose={handleCloseAvatarDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{    backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)",
}}>{user.username}</DialogTitle>
        <DialogContent sx={{    backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)",
}}>
            <Avatar
              src={user.profileImage || "/path/to/default/profile/image.jpg"}
              sx={{ width: {xs:"150px", md:"300px"}, height: {xs:"150px", md:"300px"}, }}
            />
        </DialogContent>
        <DialogActions sx={{    backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)",}}>
          <Button
            onClick={handleCloseAvatarDialog}
            sx={{ color: "#c3c3c3", textTransform: "capitalize" }}
          >
            Close
          </Button>
          <Button
            onClick={handleDownloadImage}
            sx={{ color: "#c3c3c3", textTransform: "capitalize" }}
          >
            Save Photo
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "30rem", mb: 2, color: "#fff",textAlign:"center" }}>
        <Stack
          direction="row"
          divider={<Box sx={{ width: "1px", bgcolor: "#004D74" }} />}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ textAlign: "center", cursor: "pointer" }}>
            <Typography fontWeight={800} sx={{fontSize:{xs:"0.66rem", sm:"1rem"}}}>
              {formatNumber(posts.length)}
            </Typography>
            <Typography variant="body1" sx={{fontSize:{xs:"0.66rem", sm:"1rem"}}}>Posts</Typography>
          </Box>
          <Box
            onClick={() => setFollowersModalOpen(true)}
            sx={{ textAlign: "center", color: "#fff", cursor: "pointer" }}
          >
            <Typography fontWeight={800} sx={{fontSize:{xs:"0.66rem", sm:"1rem"}}}>
              {formatNumber(followerUsers.length)}
            </Typography>
            <Typography variant="body1" sx={{fontSize:{xs:"0.66rem", sm:"1rem"}}}>Followers</Typography>
          </Box>
          <Box
            onClick={() => setFollowingModalOpen(true)}
            sx={{ textAlign: "center", color: "#fff", cursor: "pointer" }}
          >
            <Typography fontWeight={800} sx={{fontSize:{xs:"0.66rem", sm:"1rem"}}}>
              {formatNumber(followingUsers.length)}
            </Typography>
            <Typography variant="body1" sx={{fontSize:{xs:"0.66rem", sm:"1rem"}}}>Following</Typography>
          </Box>
        </Stack>
        <Link to="/settings" style={{ textDecoration: 'none' }}>
      <Button
        variant="outlined"
        sx={{
          color: '#c3c3c3',
          borderColor: '#004D74',
          textTransform: "capitalize",
          mt: "1em",
          width: "90%",
          fontSize:{xs:"0.68rem", sm:"1rem"}
        }}
      >
        Edit Your Profile
      </Button>
    </Link>    
    </Box>
      <FollowerModal
        open={followersModalOpen}
        handleClose={() => setFollowersModalOpen(false)}
        title="Followers"
        content="Here's a list of your followers..."
        users={followerUsers}
        onRemove={(userId) => handleRemove(userId)}
      />

      <FollowerModal
        open={followingModalOpen}
        handleClose={() => setFollowingModalOpen(false)}
        title="Following"
        content="Here's a list of people you're following..."
        users={followingUsers}
        onFollowToggle={(userId) => handleFollowToggle(userId)}
      />
    </Box>
  );
};

export default FollowerCard;
