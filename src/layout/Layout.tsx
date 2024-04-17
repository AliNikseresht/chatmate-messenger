import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import React, { ReactNode } from "react";

import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const showSidebar =
    location.pathname !== "/messages" &&
    location.pathname !== "/sign-up" &&
    location.pathname !== "/login" &&
    location.pathname !== "/forgot-password";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "100dvh",
        flexDirection: { xs: "column", sm: "column", lg: "row" },
      }}
    >
      {showSidebar && <Sidebar />}

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", }}>
          {children}
        </Box>

      <MobileMenu />
    </Box>
  );
};

export default Layout;
