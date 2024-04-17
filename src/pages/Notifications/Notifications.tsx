import {
  ListItemAvatar,
  ListItemText,
  Typography,
  ListItem,
  Avatar,
  Button,
  List,
  Tabs,
  Grid,
  Box,
  Tab,
} from "@mui/material";
import React from "react";

import GlobalScrollbarStyles from "../../components/GlobalScrollbarStyles ";
import { notifications } from "../../../Data/userData.json";

const Notifications: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setTabValue(newValue);
    console.log(event);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (tabValue === 0) {
      return true;
    } else if (tabValue === 1) {
      return notification.type === "mention";
    } else if (tabValue === 2) {
      return notification.type === "follow";
    }
    return true;
  });

  return (
      <Box
        sx={{
          width: "99.8%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "0.7em",
          bgcolor: "transparent",
          backgroundImage:"none",
          boxShadow:"0",
          height: "100vh",
        }}
      >
        <GlobalScrollbarStyles />
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              borderBottom: "1px solid #004D74",
              width: "100%",
              position:"sticky",
              top:"0",
              ".Mui-selected": {
                color: "#006DA4",
              },
              ".MuiTabs-indicator": {
                backgroundColor: "#006DA4",
                borderTopLeftRadius: "0.7em",
                borderTopRightRadius: "0.7em",
                height: "0.24rem",
              },
            }}
          >
            <Tab
              label="All"
              sx={{
                color: "#fff",
                textTransform: "capitalize",
                fontSize: "1rem",
              }}
            />
            <Tab
              label="Mentions"
              sx={{
                mx:{xs:"0", sm:"12em"},
                color: "#fff",
                textTransform: "capitalize",
                fontSize: "1rem",
              }}
            />
            <Tab
              label="Request"
              sx={{
                color: "#fff",
                textTransform: "capitalize",
                fontSize: "1rem",
              }}
            />
          </Tabs>
        <Grid container justifyContent="center" sx={{overflowY: "scroll",}}>
          <Grid item xs={12} md={10} lg={11}>
            <List sx={{ width: "100%" }}>
              {filteredNotifications.map((notification) => (
                <ListItem sx={{display:'flex',alignItems:"center",}} key={notification.id}>
                  <ListItemAvatar>
                    <Avatar alt={notification.user} src={notification.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{color:"#c3c3c3", fontWeight:"700"}}>{notification.user}</Typography>
                    }
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center", }}>
                        <Typography
                          sx={{ display: "inline", fontSize:{xs:"0.7rem", md:"1rem"},mr:"0.4em", textAlign:"justify" }}
                          component="span"
                          variant="body2"
                          color="#898989"
                        >
                          {notification.type === "follow"
                            ? "Follows you"
                            : notification.message}
                        </Typography>
                        <Typography color="#898989" sx={{fontSize:{xs:"0.55rem", md:"0.9rem"}, pt:"0.15em"}}>{` — ${notification.time}`}</Typography>
                      </Box>
                    }
                  />
                  {notification.type === "follow" && (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "#004D74",
                        color: "#006DA4",
                        fontWeight: "600",
                        fontSize: {xs:"0.7rem", md:"1rem"},
                      }}
                    >
                      Follow back
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Notifications;
