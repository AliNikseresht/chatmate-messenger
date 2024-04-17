import React, { ChangeEvent, useState } from "react";
import { Box } from "@mui/system";

import ChatInterface from "./_component/ChatInterface";
import MessageList from "./_component/MessageList";
import data from "../../../Data/userData.json";
import { Message } from "../../types/models";

const messageData = data.messages;

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredMessages = messageData.filter((message) =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "100%",
        height:"100vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <MessageList
        messages={filteredMessages}
        handleSelectMessage={setSelectedMessage}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <ChatInterface selectedMessage={selectedMessage} />
    </Box>
  );
};

export default Messages;
