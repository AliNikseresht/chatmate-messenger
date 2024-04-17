import { Button, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import React from "react";

interface CustomButtonProps {
  buttonText: string;
  backButton?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonText,
  backButton,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      sx={{
        display:{xs:"none", lg:"block"},
        width: isMobile ? "100%" : isTablet ? "20rem" : "6rem",
        borderRadius: "2em",
        fontSize: "1.7rem",
        py: "0",
        fontFamily: "Markazi Text",
        background: backButton
          ? "none"
          : "linear-gradient(45deg, #00b5ca 30%, #01ccdc 90%)",
        boxShadow: backButton ? "none" : "0px 0px 2px 2px rgb(0,181,202)",
        "&:hover": backButton
          ? {
              background: "transparent",
              boxShadow: "none",
            }
          : {
              background: "linear-gradient(45deg, #00b5ca 30%, #01ccdc 90%)",
              boxShadow: "0px 0px 2px 2px rgb(0,181,202)",
            },
      }}
      onClick={backButton ? handleGoBack : undefined}
      type="submit"
      variant="contained"
      fullWidth
    >
      {backButton ? (
        <>
          <IconButton
            sx={{
              height: "40px",
              textTransform: "capitalize",
              borderRadius: "0.4em",
              px: "0.4em",
              mb: "0.3em",
              mr: "0.7em",
            }}
            onClick={handleGoBack}
            aria-label="go back"
          >
            <ArrowBackIcon sx={{ color: "#fff" }} />
            <Typography ml="0.2em" color="#fff" variant="h6">
              Back
            </Typography>
          </IconButton>
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default CustomButton;
