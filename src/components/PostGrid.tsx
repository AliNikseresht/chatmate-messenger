import {
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Card,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import React from "react";

import { PostType } from "../types/models";

interface PostGridProps {
  posts: PostType[];
  handlePostClick: (post: PostType) => void;
  noPostsMessage?: string;
}

const PostGrid: React.FC<PostGridProps> = ({
  posts,
  handlePostClick,
  noPostsMessage = "No posts found",
}) => {
  const location = useLocation();

  return (
    <Grid
      container
      sx={{
        overflowY: location.pathname === "/explore" ? "auto" : "scroll",
        height: location.pathname === "/explore" ? "auto" : {xs:"auto", sm:"auto", lg:"55%", },
        pt: "0.2em",
      }}
    >
      {posts.length > 0 ? (
        posts.map((post: PostType) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={post.id}
            onClick={() => handlePostClick(post)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: "0.5em 0.5em",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "11.8em",
                px: "0.7em",
                bgcolor: "#022B42",
              }}
            >
              {post.imageURL && (
                <CardMedia
                  sx={{ width: "100%",height:"100%",objectFit:"cover" }}
                  component="img"
                  image={post.imageURL}
                  alt="Post image"
                />
              )}
              {post.musicURL && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <audio controls src={post.musicURL} style={{ width: "100%" }}>
                    Your browser does not support the audio element.
                  </audio>
                </Box>
              )}
              {post.videoURL && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <video controls src={post.videoURL} style={{ width: "100%" }}>
                    Your browser does not support the video element.
                  </video>
                </Box>
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Box sx={{ width: "100%", p: 3 }}>
          <Typography variant="body1" color="#c3c3c3" textAlign="center">
            {noPostsMessage}
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default PostGrid;
