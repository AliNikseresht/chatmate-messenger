import {
  DialogContentText,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@mui/material";
import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)"}}>{title}</DialogTitle>
      <DialogContent sx={{backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)"}}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)"}}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
