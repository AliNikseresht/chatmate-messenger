import { Box, Typography, Paper, Tabs, Tab, Modal } from "@mui/material";
import React, { useContext, useState } from "react";

import GlobalScrollbarStyles from "../../components/GlobalScrollbarStyles ";
import { UserContext } from "../../hooks/UserContext";
import FollowerCard from "./_component/FollowerCard";
import { usePosts } from "../../hooks/PostContext";
import PostGrid from "../../components/PostGrid";
import { PostType } from "../../types/models";

const Profile: React.FC = () => {
  const [value, setValue] = useState(0);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const { posts } = usePosts();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  const handlePostClick = (post: PostType) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const userContext = useContext(UserContext);
  if (!userContext) return null;
  const { user } = userContext;

  if (!userContext) {
    return <Typography>Error: User context not found!</Typography>;
  }

  let activeData: PostType[] = [];
  switch (value) {
    case 0:
      activeData = posts;
      break;
    case 1:
      activeData = posts.filter((post) => post.videoURL);
      break;
    case 2:
      activeData = posts.filter((post) => post.musicURL);
      break;
    case 3:
      activeData = posts.filter(
        (post) => !post.imageURL && !post.musicURL && !post.videoURL
      );
      break;
    case 4:
      activeData = [];
      break;
    default:
      activeData = posts;
  }

  return (
    <Paper
      sx={{
        width: "99.8%",
        borderRadius: "0.7em",
        bgcolor: "transparent",
        backgroundImage:"none",
        boxShadow:"0",
        height: "auto",
            }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          p: {xs:"0.5em", sm:"2em"},
        }}
      >
        <FollowerCard />
        <Typography variant="h5" fontWeight="600" mt="1em" color="#fff">
          {user.username}
        </Typography>
        <Typography variant="body1" sx={{ color: "#c3c3c3", my: "0.7em" }}>
          {user.bio || ""}
        </Typography>
        <Typography variant="body1" sx={{ color: "#fff", mb: "0.5rem" }}>
          {user.website || ""}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          borderBottom: "1px solid #004D74",
          width: "100%",
        }}
        >
        <Tabs
          value={value}
          onChange={handleChange}
          centered  
          sx={{
            ".MuiTab-root": { color: "#c3c3c3" },
            ".Mui-selected": {
              color: "#006DA4",
              mx:{xs:"0.5em", md:"0"},
            },
            ".MuiTabs-indicator": {
              backgroundColor: "#006DA4",
              borderTopLeftRadius: "0.7em",
              borderTopRightRadius: "0.7em",
              height: "0.25rem",
            },
          }}
        >
          <Tab label="Posts" sx={{ textTransform: "capitalize", fontSize:{xs:"0.65rem",sm:"0.8rem", md:"1rem"},minWidth:{xs:"35px", md:"auto"} }} />
          <Tab label="Reels" sx={{ textTransform: "capitalize", fontSize:{xs:"0.65rem",sm:"0.8rem", md:"1rem"},minWidth:{xs:"35px", md:"auto"} }} />
          <Tab label="Sound" sx={{ textTransform: "capitalize", fontSize:{xs:"0.65rem",sm:"0.8rem", md:"1rem"},minWidth:{xs:"35px", md:"auto"} }} />
          <Tab label="Twitt" sx={{ textTransform: "capitalize", fontSize:{xs:"0.65rem",sm:"0.8rem", md:"1rem"},minWidth:{xs:"35px", md:"auto"} }} />
          <Tab label="Tagged" sx={{ textTransform: "capitalize", fontSize:{xs:"0.65rem",sm:"0.8rem", md:"1rem"},minWidth:{xs:"35px", md:"auto"} }} />
        </Tabs>
      </Box>
      <GlobalScrollbarStyles />
      <PostGrid posts={activeData} handlePostClick={handlePostClick} />
      <Modal
        open={selectedPost != null}
        onClose={handleCloseModal}
        aria-labelledby="post-details-modal"
        aria-describedby="post-details-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            borderRadius: "0.7em",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "#022B42",
            boxShadow: 24,
            p: 4,
            outline: "none",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={user.profileImage || "/path/to/default/profile/image.jpg"}
              alt="User Profile"
              style={{ borderRadius: "50%", width: "60px", height: "60px" }}
            />
            <Typography
              variant="h5"
              fontWeight="800"
              color="#ffffff"
              ml="0.5em"
            >
              {user.username}
            </Typography>
          </Box>
          {selectedPost && (
            <Box sx={{ my: 2 }}>
              {selectedPost.imageURL && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <img
                    src={selectedPost.imageURL}
                    alt="Post"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              )}
              {selectedPost.videoURL && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <video
                    controls
                    src={selectedPost.videoURL}
                    style={{ maxWidth: "100%", borderRadius: "4px" }}
                  />
                </Box>
              )}
              {selectedPost.musicURL && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <audio
                    controls
                    src={selectedPost.musicURL}
                    style={{ width: "100%" }}
                  />
                </Box>
              )}
              <Typography
                id="post-details-modal-description"
                sx={{ textAlign: "center", mt: 2 }}
              >
                {selectedPost.content}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default Profile;
