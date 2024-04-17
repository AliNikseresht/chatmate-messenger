import {
  CircularProgress,
  Typography,
  AlertColor,
  TextField,
  Snackbar,
  Button,
  Avatar,
  Alert,
  Box,
} from "@mui/material";
import React, { useContext, ChangeEvent, FC, useState, useEffect } from "react";

import { UserContext } from "../../../hooks/UserContext";
import UserOptions from "./UserOptions ";

const existingUsernames = ["user1", "user2", "user3"];

const EditProfile: FC = () => {
  const userContext = useContext(UserContext);
  const [isChanged, setIsChanged] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [bioCharactersLeft, setBioCharactersLeft] = useState(250);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>(
    "success"
  );

  if (!userContext) {
    return <Typography variant="h6">Error: User context not found!</Typography>;
  }

  const { user, setUser } = userContext;
  const [tempUser, setTempUser] = useState(user);

  useEffect(() => {
    setBioCharactersLeft(250 - user.bio.length);
  }, [user.bio]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedBio = localStorage.getItem("bio");
    const storedWebsite = localStorage.getItem("website");

    if (storedUsername || storedBio || storedWebsite) {
      setTempUser({
        ...tempUser,
        username: storedUsername || tempUser.username,
        bio: storedBio || tempUser.bio,
        website: storedWebsite || tempUser.website,
      });
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempUser({ ...tempUser, [name]: value });
    setIsChanged(true);
    setUser({ ...user, [name]: value });

    if (name === "username") {
      validateUsername(value);
    } else if (name === "bio") {
      const maxLength = 250;
      if (value.length <= maxLength) {
        setBioCharactersLeft(maxLength - value.length);
        setBioError("");
      } else {
        setBioError(`Bio cannot exceed ${maxLength} characters.`);
      }
    } else if (name === "website") {
      if (value && !/^.+\..+$/.test(value)) {
        setWebsiteError("Please enter a valid URL.");
      } else {
        setWebsiteError("");
      }
    }
  };

  const validateUsername = (value: string) => {
    const regex = /^[a-zA-Z0-9._]{3,26}$/;

    if (!regex.test(value)) {
      setUsernameError("Username must be between 3 and 26 characters.");
    } else if (existingUsernames.includes(value)) {
      setUsernameError("This username is already taken.");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameError || bioError || websiteError) {
      setSnackbarOpen(true);
      setSnackbarMessage("Please fix the errors before saving.");
      setSnackbarSeverity("error");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUser(tempUser);
      setIsChanged(false);
      setSnackbarMessage("Profile updated successfully.");
      setSnackbarSeverity("success");
      setTempUser(tempUser);
      setUsernameError("");
      setBioError("");
      setWebsiteError("");
      setBioCharactersLeft(250 - tempUser.bio.length);
      localStorage.setItem("username", tempUser.username);
      localStorage.setItem("bio", tempUser.bio);
      localStorage.setItem("website", tempUser.website);
      localStorage.setItem("email", tempUser.email);
    } catch (error) {
      setSnackbarMessage("Failed to update profile.");
      setSnackbarSeverity("error");
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setTempUser({ ...tempUser, profileImage: e.target?.result as string });
        setIsChanged(true);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setTempUser({
      ...tempUser,
      profileImage: "",
    });

    setUser({
      ...user,
      profileImage: "",
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY:"scroll",
        }}
      >
        <Typography
          sx={{
            alignSelf: "flex-start",
            pl: "0.7em",
            pt: "0.7em",
            fontSize:{xs:"1rem", md:"2.5rem"}
          }}
          color="#fff"
          fontWeight="600"
          gutterBottom
        >
          Edit Profile
        </Typography>
        <Avatar
          src={tempUser.profileImage || "/path/to/default/profile/image.jpg"}
          alt={user.name || "User Profile"}
          sx={{
            width: 135,
            height: 135,
            margin: "0em auto 1em auto",
            border: "3px solid #fff",
          }}
        />
        <Box sx={{ textAlign: "center", }}>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="raised-button-file"
          />
          <label htmlFor="raised-button-file">
            <Typography
              variant="h6"
              component="span"
              sx={{ cursor: "pointer", color: "#fff" }}
            >
              Change Profile Photo
            </Typography>
          </label>
          <Button
            onClick={handleRemoveImage}
            sx={{
              color: "#fff",
              display: "block",
              margin: "auto",
              textTransform: "capitalize",
            }}
          >
            Remove Profile Photo
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems:{xs:"center",md:"flex-start"},
            flexDirection:{xs:"column", sm:"column",md:"row"},
          }}
          >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "22rem",
              px:"0.5em"
            }}
          >
            <TextField
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              variant="outlined"
              sx={{
                my: "0.5em",
                backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 150.56%)",
                borderRadius: "0.7em",
                "& .MuiInputBase-input::placeholder": {
                  color: "#c3c3c3",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
            <TextField
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
              error={!!usernameError}
              helperText={usernameError}
              variant="outlined"
              sx={{
                mb: "0.5em",
                backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 150.56%)",
                borderRadius: "0.7em",
                "& .MuiInputBase-input::placeholder": {
                  color: "#c3c3c3",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
            <TextField
              name="bio"
              placeholder="Bio"
              value={user.bio}
              onChange={handleChange}
              error={!!bioError}
              helperText={`${bioCharactersLeft} characters left`}
              variant="outlined"
              multiline
              sx={{
                mb: "0.5em",
                backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 150.56%)",
                borderRadius: "0.7em",
                "& .MuiInputBase-input::placeholder": {
                  color: "#c3c3c3",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#c1c1c1",
                },
              }}
              inputProps={{ maxLength: 250, color: "red" }}
            />
            <TextField
              name="website"
              placeholder="Website"
              value={user.website}
              onChange={handleChange}
              error={!!websiteError}
              helperText={websiteError || "e.g., http://www.example.com"}
              variant="outlined"
              sx={{
                mb: 1,
                backgroundImage: "linear-gradient(252deg, #032030 0.73%, #022b42 150.56%)",
                borderRadius: "0.7em",
                "& .MuiInputBase-input::placeholder": {
                  color: "#c3c3c3",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#c1c1c1",
                },
              }}
            />
          </Box>
            <UserOptions />
        </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isChanged || isLoading}
              sx={{
                width: "40%",
                borderRadius: "0.7em",
                bgcolor: "#006DA4",
                py: "0.8em",
                "&:hover": {
                  bgcolor: "#004D74",
                },
                color: "#fff",
                my: 1,
                textTransform: "none",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Save Changes"
              )}
            </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProfile;
