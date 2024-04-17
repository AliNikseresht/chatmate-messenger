import { IconButton, Button, CircularProgress, Typography, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PhotoIcon from "@mui/icons-material/Photo";
import MovieIcon from "@mui/icons-material/Movie";
import React from "react";

interface PostBoxStackProps {
  isLoading: boolean;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMusicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setLocationModalOpen: (isOpen: boolean) => void;
  submitPost: () => void;
}

const PostBoxStack: React.FC<PostBoxStackProps> = ({
  isLoading,
  handleImageChange,
  handleMusicChange,
  handleVideoChange,
  setLocationModalOpen,
  submitPost,
}) => {
  return (
    <Stack
      direction="row-reverse"
      sx={{
        py: { xs: "1em", sm: "2em" },
        pr: { xs: "0.5em", sm: "2.3em" },
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", sm: "right" },
      }}
    >
      <Button
        variant="contained"
        sx={{
          marginLeft: 2,
          px: "3.5em",
          textTransform: "capitalize",
          bgcolor: "#006DA4",
          display: { xs: "none", sm: "flex" },
          "&:hover": {
            bgcolor: "#004D74",
          },
        }}
        onClick={submitPost}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          <Typography sx={{ color: "#c3c3c3" }}>Post</Typography>
        )}
      </Button>
      <IconButton
        sx={{
          color: "#fff",
          "&:hover": {
            bgcolor: "#004D74",
          },
        }}
        component="label"
      >
        <PhotoIcon />
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </IconButton>
      <IconButton
        sx={{
          color: "#fff",
          mx: "0.5em",
          "&:hover": {
            bgcolor: "#004D74",
          },
        }}
        component="label"
      >
        <MusicNoteIcon />
        <input
          accept="audio/*"
          type="file"
          style={{ display: "none" }}
          onChange={handleMusicChange}
        />
      </IconButton>
      <IconButton
        sx={{
          color: "#fff",
          mx: "0.5em",
          "&:hover": {
            bgcolor: "#004D74",
          },
        }}
        component="label"
      >
        <MovieIcon />
        <input
          accept="video/*"
          type="file"
          style={{ display: "none" }}
          onChange={handleVideoChange}
        />
      </IconButton>
      <IconButton
        sx={{ color: "#fff", "&:hover": { bgcolor: "#004D74" } }}
        onClick={() => setLocationModalOpen(true)}
      >
        <LocationOnIcon />
      </IconButton>
      <Button
        variant="contained"
        sx={{
          marginLeft: 2,
          px: "3.5em",
          textTransform: "capitalize",
          bgcolor: "#006DA4",
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          "&:hover": {
            bgcolor: "#004D74",
          },
        }}
        onClick={submitPost}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          "Post"
        )}
      </Button>
    </Stack>
  );
};

export default PostBoxStack;
