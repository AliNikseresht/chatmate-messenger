import { GlobalStyles } from "@mui/material";
import React from "react";

const scrollbarStyles = {
  "*::-webkit-scrollbar": {
    width: "5px",
    zIndex:"9999"
  },
  "*::-webkit-scrollbar-track": {
    background: "rgba(0, 0, 0, 0.2)",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "#006DA4",
    borderTopLeftRadius: "0.7em",
    borderBottomLeftRadius: "0.7em",
    border: "2px solid rgba(0, 0, 0, 0.2)",
  },
  "*::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
};

const GlobalScrollbarStyles: React.FC = () => {
  return <GlobalStyles styles={scrollbarStyles} />;
};

export default GlobalScrollbarStyles;
