import { Modal, Typography, Button } from "@mui/material";
import React from "react";

type EditPostModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (newContent: string) => void;
  initialContent: string;
};

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialContent,
}) => {
  const [content, setContent] = React.useState(initialContent);

  const handleSubmit = () => {
    onSubmit(content);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-post-modal"
      aria-describedby="edit-post-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
        <Typography variant="h6">Edit Post</Typography>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
};

export default EditPostModal;
