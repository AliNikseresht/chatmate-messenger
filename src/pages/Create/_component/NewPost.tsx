import {
  CardContent,
  IconButton,
  Typography,
  Snackbar,
  Stack,
  Box,
} from "@mui/material";
import React, { useState, useEffect, MouseEvent } from "react";
import { RiShareCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

import ShareModal from "../../home/_component/ModalSharePost";
import { usePosts } from "../../../hooks/PostContext";
import userData from "../../../../Data/userData.json";
import { timeAgo } from "../../../utils/PostTime";
import CommentSection from "./CommentSection";
import MentionModal from "./MentionModal";
import PostHeader from "./PostHeader";

type User = {
  name: string;
  username: string;
  avatar: string;
};

type Comment = {
  author: string;
  text: string;
};

type NewPostProps = {
  user: User;
  image?: string;
  video?: string;
  music?: string;
  location?: string;
  retweets: number;
};

type Follower = {
  name: string;
  username: string;
  avatar: string;
};

const usersToShare: Follower[] = userData.followers.map(
  (follower: Follower) => {
    return {
      name: follower.name,
      username: follower.username,
      avatar: follower.avatar,
    };
  }
);

const NewPost: React.FC<NewPostProps> = ({ user }) => {
  const { posts, deletePost, editPost, archivePost, mentionPost } = usePosts();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [hideTimer, setHideTimer] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const routerLocation = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openShareSnackbar, setOpenShareSnackbar] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [postLikes, setPostLikes] = useState<{ [postId: string]: number }>({});
  const [postShares, setPostShares] = useState<{ [postId: string]: number }>(
    {}
  );
  const [showMentionModal, setShowMentionModal] = useState(false);

  const togglePostLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
      setPostLikes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) - 1 }));
    } else {
      setLikedPosts((prev) => [...prev, postId]);
      setPostLikes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
    }
  };

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  const sharePost = (userToShare: User) => {
    console.log(`Sharing post to ${userToShare.username}`);
    setOpenShareSnackbar(true);
    setShowShareModal(false);
    setPostShares((prev) => ({
      ...prev,
      [selectedPostId!]: (prev[selectedPostId!] || 0) + 1,
    }));
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    console.log(event);
    setOpenSnackbar(false);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, { author: user.name, text: newComment }]);
      setNewComment("");
      setShowCommentInput(true);
      startHideTimer();
    }
  };

  const startHideTimer = () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    const timer: number = window.setTimeout(() => {
      setShowCommentInput(false);
    }, 10000);
    setHideTimer(timer);
  };

  const toggleComments = () => {
    if (!showCommentInput) {
      setShowCommentInput(true);
    } else {
      setShowCommentInput(false);
      startHideTimer();
    }
  };

  useEffect(() => {
    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [hideTimer]);

  useEffect(() => {
    if (routerLocation.state?.signUpSuccess) {
      setOpenSnackbar(true);
      window.history.replaceState({}, document.title);
    }
  }, [routerLocation]);

  const handleMenuClick = (
    event: MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
    setPostShares((prev) => ({ ...prev, [postId]: prev[postId] || 0 }));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (selectedPostId) {
      deletePost(selectedPostId);
      setOpenSnackbar(true);
      setSnackbarMessage("Post deleted successfully!");
      handleMenuClose();
    }
  };

  const handleEdit = () => {
    const postToEdit = posts.find((post) => post.id === selectedPostId);
    if (!postToEdit) return;

    const newContent = prompt("Edit your post:", postToEdit.content);
    if (newContent !== null && newContent !== postToEdit.content) {
      editPost(postToEdit.id, { ...postToEdit, content: newContent });
      setOpenSnackbar(true);
      setSnackbarMessage("Post edited successfully!");
    }
    handleMenuClose();
  };

  const handleArchive = () => {
    if (selectedPostId) {
      archivePost(selectedPostId);
      setOpenSnackbar(true);
      setSnackbarMessage("Post archived successfully!");
      handleMenuClose();
    }
  };

  const handleMention = () => {
    setShowMentionModal(true);
  };

  const handleMentionConfirm = (username: string) => {
    mentionPost(selectedPostId!, username);
    setOpenSnackbar(true);
    setSnackbarMessage(`Mentioned ${username} in post!`);
    handleMenuClose();
    setShowMentionModal(false);
  };

  const reversedPosts = [...posts].reverse();

  return (
    <>
      {reversedPosts.map((post, index) => (
        <Box
          key={post.id}
          sx={{ width: "98%", ml: "0.4em", bgcolor: "#022B42", boxShadow: "0" }}
        >
          <PostHeader
            user={user}
            post={post}
            anchorEl={anchorEl}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleArchive={handleArchive}
            handleMention={handleMention}
            openSnackbar={openSnackbar}
            snackbarMessage={snackbarMessage}
            setOpenSnackbar={setOpenSnackbar}
          />
          <CardContent sx={{ borderBottom: "1px solid #003554" }}>
            <Box key={index} sx={{ marginBottom: 4 }}>
              <Typography sx={{ color: "#c3c3c3" }}>{post.content}</Typography>
              {post.imageURL && (
                <Box sx={{ marginY: 2, width: "100%", textAlign: "center" }}>
                  <img
                    src={post.imageURL}
                    alt="Post image"
                    style={{
                      width: "45%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
              {post.musicURL && (
                <Box sx={{ marginY: 2 }}>
                  <audio
                    controls
                    src={post.musicURL}
                    style={{ width: "100%" }}
                  />
                </Box>
              )}
              {post.videoURL && (
                <Box sx={{ marginY: 2 }}>
                  <video
                    controls
                    src={post.videoURL}
                    style={{
                      width: "100%",
                      height: "20rem",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "2em",
              }}
            >
              <Stack direction="row">
                <IconButton
                  aria-label="likes"
                  onClick={() => togglePostLike(post.id)}
                  sx={{ "&:hover": { bgcolor: "transparent" } }}
                >
                  <GoHeart
                    style={{
                      color: likedPosts.includes(post.id) ? "red" : "#c3c3c3",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: 0.5, color: "#c3c3c3" }}
                  >
                    {postLikes[post.id] || 0}
                  </Typography>
                </IconButton>
                <IconButton
                  aria-label="replies"
                  onClick={toggleComments}
                  sx={{ "&:hover": { bgcolor: "transparent" } }}
                >
                  <FaRegComment style={{ color: "#c3c3c3" }} />
                  <Typography
                    variant="body2"
                    sx={{ ml: 0.5, color: "#c3c3c3" }}
                  >
                    {comments.length}
                  </Typography>
                </IconButton>
                <IconButton
                  aria-label="retweets"
                  onClick={toggleShareModal}
                  sx={{ "&:hover": { bgcolor: "transparent" } }}
                >
                  <RiShareCircleLine style={{ color: "#c3c3c3" }} />
                  <Typography
                    variant="body2"
                    sx={{ ml: 0.5, color: "#c3c3c3" }}
                  >
                    {postShares[post.id] || 0}
                  </Typography>
                </IconButton>
              </Stack>
              <Typography
                color="#c3c3c3"
                component="span"
                fontSize="0.6rem"
                mt="1em"
              >
                {timeAgo(post.time)}
              </Typography>
            </Box>
            <CommentSection
              showCommentInput={showCommentInput}
              newComment={newComment}
              handleCommentChange={handleCommentChange}
              submitComment={submitComment}
              comments={comments}
            />
          </CardContent>
        </Box>
      ))}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        usersToShare={usersToShare}
        onShare={sharePost}
      />
      <MentionModal
        open={showMentionModal}
        onClose={() => setShowMentionModal(false)}
        onMention={handleMentionConfirm}
      />
      <Snackbar
        open={openShareSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenShareSnackbar(false)}
        message={
          <Typography color="green" variant="subtitle2">
            Post shared successfully!
          </Typography>
        }
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          <Typography color="green" variant="subtitle2">
            Sign up successful!
          </Typography>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            X
          </IconButton>
        }
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          <Typography color="green" variant="subtitle2">
            {snackbarMessage}
          </Typography>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            X
          </IconButton>
        }
      />
    </>
  );
};

export default NewPost;
