import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../hooks/UserContext";

const ProfileSection = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <Typography>Error: User context not found!</Typography>;
  }

  const { user } = userContext;

  const handleEditProfileClick = () => {
    navigate("/edit-profile");
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
        textAlign: "center",
        borderRadius: "0.7em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 0",
          flexWrap: "wrap",
          gap: "0.7em",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #aa9f99",
            width: "47.5%",
            borderRadius: "0.3em",
            py: "0.5em",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}
          >
            1.2M
          </Typography>
          <Typography color="#fff" variant="body2">
            Followers
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #aa9f99",
            width: "47.5%",
            borderRadius: "0.3em",
            py: "0.5em",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}
          >
            22.4k
          </Typography>
          <Typography color="#fff" variant="body2">
            Following
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #aa9f99",
            width: "100%",
            borderRadius: "0.3em",
            py: "0.5em",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}
          >
            1.3k
          </Typography>
          <Typography color="#fff" variant="body2">
            Posts
          </Typography>
        </Box>
      </Box>
      <Avatar
        src={user.profileImage || "/path/to/default/profile/image.jpg"}
        alt={user.name || "User Name"}
        sx={{
          width: 110,
          height: 110,
          margin: "1em auto",
          border: "4px solid #fff",
        }}
      />
      <Typography variant="h6" sx={{ my: "1rem" }}>
        {user.name || ""}
      </Typography>
      <Typography variant="body1" sx={{ color: "#fff", mb: "0.5rem" }}>
        {user.username || ""}
      </Typography>
      <Typography variant="body1" sx={{ color: "#fff", mb: "1rem" }}>
        {user.bio || ""}
      </Typography>
      <Typography variant="body1" sx={{ color: "#fff", mb: "0.5rem" }}>
        {user.website || ""}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          marginBottom: "1rem",
          width: "100%",
          color: "#fff",
          borderColor: "#fff",
        }}
        onClick={handleEditProfileClick}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfileSection;
