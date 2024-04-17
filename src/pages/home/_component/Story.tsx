import { Box, Avatar, Typography, Stack, Button } from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../../hooks/UserContext";
import userData from "../../../../Data/userData.json";
import Logo from "../../../../public/sidbar-logo.png";

interface StoryData {
  name: string;
  avatar: string;
}

const Story: React.FC = () => {
  const userContext = useContext(UserContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  if (!userContext) return null;
  const { user } = userContext;

  const personalStory: StoryData = {
    name: "Your Name",
    avatar: user.profileImage || "/path/to/default/profile/image.jpg",
  };
  const storiesData = [personalStory, ...userData.followers];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", handleMouseMove);
      },
      { once: true }
    );
  };

  return (
    <>
    <Box sx={{display: { xs: "flex", lg: "none" }, justifyContent:"space-between", alignItems:"center",}}>
    <Link to="/">
        <img
          src={Logo}
          alt="logo-app"
          style={{ width: "45%", margin: "0.5em 0.5em" }}
        />
      </Link>
      <Link to="/messages" style={{ textDecoration: 'none' }}>
      <Button
        sx={{
          color: '#c3c3c3',
          borderColor: '#004D74',
          minWidth:"0.5rem",
          height:"45px"
        }}
      >
        <TelegramIcon sx={{fontSize:"1.8rem", mb:"0.2em"}}/>
      </Button>
    </Link>    
    </Box>
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        display: "flex",
        overflowX: "scroll",
        justifyContent: "flex-start",
        alignItems: "center",
        py: "0.5em",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {storiesData.map((story, index) => (
        <Stack
          key={index}
          direction="column"
          alignItems="center"
          spacing={1}
          sx={{ mx: "0.45em", p: "0", height: "7rem" }}
        >
          <Avatar
            src={story.avatar}
            alt="follower profile"
            sx={{ width: 60, height: 60, cursor: "pointer" }}
          />
          <Typography
            variant="caption"
            color="#fff"
            textAlign="center"
            fontSize="0.7rem"
          >
            {story.name}
          </Typography>
        </Stack>
      ))}
    </Box>
    </>
  );
};

export default Story;
