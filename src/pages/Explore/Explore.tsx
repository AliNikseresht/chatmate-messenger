import {
  CircularProgress,
  CardContent,
  Typography,
  Button,
  Grid,
  Card,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import GlobalScrollbarStyles from "../../components/GlobalScrollbarStyles ";
import { usePosts } from "../../hooks/PostContext";
import PostGrid from "../../components/PostGrid";

interface Image {
  id: number;
  previewURL: string;
  tags: string;
}

interface Video {
  id: number;
  videos: {
    large: {
      url: string;
      width: number;
      height: number;
      size: number;
      thumbnail: string;
    };
    medium: {
      url: string;
      width: number;
      height: number;
      size: number;
      thumbnail: string;
    };
  };
  tags: string;
}

const Explore = () => {
  const { posts } = usePosts();
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const postsWithHashtags = posts.filter((post) => post.content.includes("#"));

  const refreshPosts = () => {
    setLoadingPosts(true);
    setTimeout(() => {
      setLoadingPosts(false);
      setRefreshKey((prevKey) => prevKey + 1);
    }, 3000);
  };

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const imageResponse = await axios.get(
          `https://pixabay.com/api/?key=43304945-912b2e9ad8b4453677e94b640&q=yellow+flowers&image_type=photo`
        );
        const videoResponse = await axios.get(
          `https://pixabay.com/api/videos/?key=43304945-912b2e9ad8b4453677e94b640&q=yellow+flowers`
        );

        setImages(imageResponse.data.hits);
        setVideos(videoResponse.data.hits);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "transparent",
        backgroundImage:"none",
        boxShadow:"0",
        position: "relative",
        width: "99.8%",
        borderRadius: "0.7em",
        height: "100vh",
        overflowY:"scroll",
        p: 2,
      }}
    >
      <GlobalScrollbarStyles />
      {(loading || loadingPosts) && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mt: "2em",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && !loadingPosts && postsWithHashtags.length > 0 && (
        <PostGrid
          key={refreshKey}
          posts={postsWithHashtags}
          handlePostClick={(post) => console.log(post)}
        />
      )}

      {!loading && !loadingPosts && (
        <>
          {images.length > 0 && (
            <Grid container spacing={2}>
              {images.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Card>
                    <img
                      src={image.previewURL}
                      alt={image.tags}
                      style={{ width: "100%" }}
                    />
                    <CardContent>
                      <Typography variant="body1">{image.tags}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {videos.length > 0 && (
            <Grid container spacing={2}>
              {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <Card>
                    <video width="100%" controls>
                      <source src={video.videos.medium.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <CardContent>
                      <Typography variant="body1">{video.tags}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {postsWithHashtags.length === 0 &&
            images.length === 0 &&
            videos.length === 0 && (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <Typography variant="body1" color="#c3c3c3">
                  Your internet connection is weak, and the content is still
                  loading
                </Typography>
              </Box>
            )}
        </>
      )}

      {!loading && !loadingPosts && (
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Button
            sx={{
              marginLeft: 2,
              px: "3.5em",
              textTransform: "capitalize",
              bgcolor: "#006DA4",
              "&:hover": {
                bgcolor: "#004D74",
              },
            }}
            variant="contained"
            onClick={refreshPosts}
          >
            Refresh
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Explore;
