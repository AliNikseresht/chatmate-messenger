import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent } from "react";

interface CustomSearchProps {
  size?: number | string;
  color?: string;
  placeholder?: string;
  borderRadios?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearch: React.FC<CustomSearchProps> = ({
  size = 350,
  color = "#323232",
  borderRadios = "0.7em",
  placeholder = "Search",
  onChange,
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: size,
        borderRadius: borderRadios,
        bgcolor: color,
      }}
    >
      <IconButton
        type="button"
        sx={{ p: "10px", color: "#fff" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search google maps" }}
        onChange={onChange}
      />
    </Paper>
  );
};

export default CustomSearch;
