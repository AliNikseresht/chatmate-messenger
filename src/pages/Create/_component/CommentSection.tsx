import { Collapse, TextField, Button, Typography, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

type Comment = {
  author: string;
  text: string;
};

type CommentSectionProps = {
  showCommentInput: boolean;
  newComment: string;
  handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitComment: () => void;
  comments: Comment[];
};

const CommentSection: React.FC<CommentSectionProps> = ({
  showCommentInput,
  newComment,
  handleCommentChange,
  submitComment,
  comments,
}) => {
  return (
    <Collapse in={showCommentInput} timeout="auto" unmountOnExit>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "#003554",
          borderRadius: "0.7em",
          alignItems: "center",
          justifyContent: "space-between",
          pr: "1em",
          mt: "1em",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
          sx={{
            py: "0.5em",
            color: "#fff",
            bgcolor: "#003554",
            borderRadius: "0.7em",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "0",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#c3c3c3",
              opacity: 1,
            },
          }}
        />
        <Button
          onClick={submitComment}
          variant="contained"
          sx={{
            height: "40px",
            textTransform: "capitalize",
            borderRadius: "0.7em",
            px: "2em",
            py: "1.8em",
            bgcolor: "#006DA4",
            "&:hover": {
              bgcolor: "#004D74",
            },
            color: "#fff",
          }}
        >
          <SendIcon />
        </Button>
      </Box>
      {comments.map((comment, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ mt: 2, color: "#c3c3c3" }}
        >
          <strong style={{ color: "#fff" }}>{comment.author}:</strong>{" "}
          {comment.text}
        </Typography>
      ))}
    </Collapse>
  );
};

export default CommentSection;
