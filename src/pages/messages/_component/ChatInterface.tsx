import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Card, Typography, TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import GlobalScrollbarStyles from "../../../components/GlobalScrollbarStyles ";
import { UserContext } from "../../../hooks/UserContext";
import otherUserImage from "../../../../public/logo.png";
import { Message } from "../../../types/models";

interface ChatInterfaceProps {
  selectedMessage: Message | null;
}

interface UserMessage {
  id: number;
  text: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedMessage }) => {
  const userContext = useContext(UserContext);
  const [messageText, setMessageText] = useState("");
  const [sentMessages, setSentMessages] = useState<UserMessage[]>([]);

  if (!userContext) return null;
  const { user } = userContext;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = { id: Date.now(), text: messageText };
    setSentMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessageText("");
  };

  return (
      <Card
        sx={{
          width: "100%",
          bgcolor: "transparent",
          backgroundImage:"none",
          boxShadow:"0",
          color: "#fff",
          overflowY: "scroll",
          borderRadius: "0",
          borderEndEndRadius: "0.7em",
          borderTopRightRadius: "0.7em",
          display:{xs:"none", sm:"block"},
          position:"relative",
          height: {xs:"43rem", lg:"100%"},
        }}
      >
        <GlobalScrollbarStyles />
        <Box>
          {selectedMessage ? (
            <>
              <Box
                sx={{
                  position: "sticky",
                  borderBottom: "1px solid #004D74",
                  width: "100%",
                  top: "0",
                  p: "1em",
                }}
              >
                <Typography variant="h4" fontWeight="800">
                  {selectedMessage.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "1.8em",
                  marginBottom: 2,
                  p: "1em",
                }}
              >
                <img
                  src={otherUserImage}
                  alt={selectedMessage.name}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="800">
                    {selectedMessage.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "inline-block",
                      bgcolor: "#022B42",
                      padding: "1em",
                      borderRadius: "0.7em",
                      color: "#cbcbcb",
                    }}
                  >
                    {selectedMessage.fullMessage}
                    <Typography variant="body2" color="#cbcbcb">
                      {selectedMessage.timeAgo}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Typography
              variant="body1"
              sx={{ position: "absolute", top: "50%", left: "50%" }}
            >
              No message
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: "4em",
              p: "1em",
            }}
          >
            {sentMessages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "inline-flex",
                  maxWidth: "fit-content",
                  my: "0.5em",
                  alignSelf: "flex-end",
                  ml: "4.2em",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    bgcolor: "#022B42",
                    padding: "4px 8px",
                    borderRadius: "0.7em",
                    color: "#cbcbcb",
                  }}
                >
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              width: "100%",
              maxWidth: "67.8rem",
              display: "flex",
              alignItems: "center",
              color: "#fff",
              mt: "2em",
              position: "absolute",
              bottom: "1em",
              px: "1em",
            }}
          >
            <img
              src={user.profileImage || "/path/to/default/profile/image.jpg"}
              alt="User Profile"
              style={{ borderRadius: "50%", width: "55px", height: "55px" }}
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                bgcolor: "#003554",
                borderRadius: "0.7em",
                alignItems: "center",
                justifyContent: "space-between",
                pr: "1em",
                ml: "1em",
              }}
            >
              <TextField
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                value={messageText}
                onChange={handleInputChange}
                sx={{
                  marginRight: 1,
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
                  "& .MuiInputBase-input": {
                    bgcolor: "transparent",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#c3c3c3",
                    opacity: 1,
                  },
                }}
                InputProps={{
                  style: {
                    borderRadius: "0.7em",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  height: "40px",
                  textTransform: "capitalize",
                  borderRadius: "0.7em",
                  px: "2em",
                  bgcolor: "#006DA4",
                  "&:hover": {
                    bgcolor: "#004D74",
                  },
                  color: "#fff",
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
  );
};

export default ChatInterface;
