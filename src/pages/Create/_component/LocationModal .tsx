import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";

interface LocationModalProps {
  open: boolean;
  location: string;
  onClose: () => void;
  onLocationChange: (newLocation: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  open,
  location,
  onClose,
  onLocationChange,
}) => {
  const [newLocation, setNewLocation] = useState<string>("");

  const handleDone = () => {
    onLocationChange(newLocation);
    onClose();
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "40%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          p: 10,
          textAlign: "end",
        }}
      >
        <Typography textAlign="start" variant="h6" gutterBottom>
          Search for your location:
        </Typography>
        <Typography variant="body1" color="#fff" ml={2}>
          Location: {location}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter location"
          value={newLocation}
          onChange={handleLocationChange}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleDone}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default LocationModal;
