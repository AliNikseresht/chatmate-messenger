import {
  Typography,
  InputBase,
  Avatar,
  Box,
} from "@mui/material";
import React, { ChangeEvent, useContext, useState } from "react";

import GlobalScrollbarStyles from "../../../components/GlobalScrollbarStyles ";
import { UserContext } from "../../../hooks/UserContext";
import { usePosts } from "../../../hooks/PostContext";
import LocationModal from "./LocationModal ";
import PostBoxStack from "./PostBoxStack";

interface PostData {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

interface PostBoxProps {
  handlePostData: (postData: PostData) => void;
}

const PostBox: React.FC<PostBoxProps> = ({ handlePostData }) => {
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [musicURL, setMusicURL] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [mediaDetails, setMediaDetails] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const { addPost } = usePosts();

  const userContext = useContext(UserContext);

  if (!userContext) return null;
  const { user } = userContext;

  const resetState = () => {
    setContent("");
    setImageFile(null);
    setMusicFile(null);
    setVideoFile(null);
    setImageURL(null);
    setMusicURL(null);
    setVideoURL(null);
    setMediaDetails(null);
  };

  const submitPost = () => {
    if (!content && ![imageFile, musicFile, videoFile].filter(Boolean).length) {
      handlePostData({
        open: true,
        message: "Please enter some content or attach a media file.",
        severity: "error",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newPost = {
        id: Date.now().toString(),
        content,
        imageURL: imageURL || "",
        musicURL: musicURL || "",
        videoURL: videoURL || "",
        location,
        time: new Date().toISOString(),
        likes: 0,
        comments: [],
        archived: false,
      };
      addPost(newPost);
      resetState();
      handlePostData({
        open: true,
        message: "Post submitted successfully!",
        severity: "success",
      });
    }, 2000);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
      updateMediaDetails(file);
      setMusicFile(null);
      setMusicURL(null);
      setVideoFile(null);
      setVideoURL(null);
    }
  };

  const handleMusicChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setMusicFile(file);
      setMusicURL(URL.createObjectURL(file));
      updateMediaDetails(file);
      setImageFile(null);
      setImageURL(null);
      setVideoFile(null);
      setVideoURL(null);
    }
  };

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      updateMediaDetails(file);
      setImageFile(null);
      setImageURL(null);
      setMusicFile(null);
      setMusicURL(null);
    }
  };

  const updateMediaDetails = (file: File) => {
    setMediaDetails({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // height:"100vh"
      }}
    >
      <GlobalScrollbarStyles />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "1.5em 1.8em",
            borderBottom: "1px solid #004D74",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={user.profileImage || "/path/to/default/profile/image.jpg"}
              sx={{ marginRight: 2, width: "3.3rem", height: "3.3rem" }}
            />
            <Typography variant="h5" fontWeight="600" mt="0.1em" color="#fff">
              {user.username}
            </Typography>
          </Box>
          {location && (
            <Typography variant="body1" ml="0.4em" mt="0.4em" color="#fff">
              {location}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: {xs:"0.5em 1em", md:"1em 2em"},
            overflowY: "scroll",
            justifySelf:"center",
          }}
        >
          <InputBase
            placeholder="What's happening?"
            fullWidth
            multiline
            value={content}
            onChange={(event) => setContent(event.target.value)}
            sx={{ color: "#fff", mt: "0.1em", mb: "2em" }}
          />
          <Box sx={{width:"100%", display:"flex",alignItems:'center', flexDirection:"column",height:"25rem"}}>
          {imageURL && (
            <img
              src={imageURL}
              alt="Preview"
              style={{ maxWidth: "40%" }}
            />
          )}
          {musicURL && (
            <audio controls src={musicURL} style={{ maxWidth: "100%" }} />
          )}
          {videoURL && (
            <video
              controls
              src={videoURL}
              style={{ maxWidth: "60%", }}
            />
          )}
          {mediaDetails && (
            <Typography sx={{ color: "#c3c3c3", mt: "0.5em", fontSize:{xs:"0.6rem", md:"1rem"} , textAlign:"center"}}>
              {mediaDetails.name} - {mediaDetails.size}
            </Typography>
          )}
          </Box>
        </Box>
        <PostBoxStack
  isLoading={isLoading}
  handleImageChange={handleImageChange}
  handleMusicChange={handleMusicChange}
  handleVideoChange={handleVideoChange}
  setLocationModalOpen={setLocationModalOpen}
  submitPost={submitPost}
/>

      <LocationModal
        open={isLocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        location={location}
        onLocationChange={setLocation}
      />
    </Box>
  );
};

export default PostBox;
