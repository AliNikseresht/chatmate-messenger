import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import React, { ChangeEvent } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import { Box } from "@mui/system";

import CustomButton from "../../../components/CustomButton";
import CustomSearch from "../../../components/CustomSearch";
import { Message } from "../../../types/models";

interface MessageListProps {
  messages: Message[];
  handleSelectMessage: (message: Message) => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  handleSelectMessage,
  handleSearchChange,
  searchQuery,
}) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: {xs:"100%", md:"20.5rem"},
        bgcolor: "transparent",
        backgroundImage: "none",
        boxShadow: "0",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        borderRadius: "0",
        borderBottomLeftRadius: "0.7em",
        borderTopLeftRadius: "0.7em",
        position: "relative",
        pt: "0",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "0",
          backgroundImage:
            "linear-gradient(192deg, #032030 0.73%, #022b42 39.56%)",
          zIndex: 2,
          py: "1em",
          width: "100%",
          right: "0",
          px: "1.1em",
        }}
      >
        <CustomButton buttonText="Go Back" backButton />
        <CustomSearch
          size="100%"
          borderRadios="0.7em"
          color="#022B42"
          placeholder="Search messages"
          onChange={handleSearchChange}
        />
      </Box>
      {messages
        .filter((message) =>
          message.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((message) => (
          <ListItem
            key={message.id}
            alignItems="flex-start"
            sx={{ padding: "1em 0.1em 1em 1.2em" }}
            button
            onClick={() => handleSelectMessage(message)}
          >
            <ListItemAvatar>
              <Avatar alt={message.name} src={message.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={message.name}
              secondary={
                <Typography component="span" variant="body2" color="#c3c3c3">
                  {message.messagePreview}
                </Typography>
              }
              primaryTypographyProps={{ fontSize: "1rem", fontWeight: "bold" }}
              secondaryTypographyProps={{ fontSize: "0.875rem" }}
              sx={{ margin: 0 }}
            />
            <Typography
              variant="caption"
              sx={{
                padding: "1em",
                color: "#c3c3c3",
                textAlign: "right",
                flex: "none",
              }}
            >
              {message.timeAgo}
            </Typography>
          </ListItem>
        ))}
    </List>
  );
};

export default MessageList;
