import { createTheme } from "@mui/material";

/**
 * Extends the `BreakpointOverrides` interface from MUI system to include a new breakpoint `x2`.
 */
declare module "@mui/system" {
  interface BreakpointOverrides {
    x2: true;
  }
}

/**
 * Defines the background gradient used in the theme.
 */
const BACKGROUND_GRADIENT =
  "linear-gradient(252deg, #032030 0.73%, #022b42 39.56%)";

/**
* Creates a Material-UI theme with customizations.
*/
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C7C6C3",
    },
    background: {
      default: BACKGROUND_GRADIENT,
    },
    text: {
      primary: "#C7C6C3",
    },
  },
  typography: {
    fontFamily: ["Josefin Sans", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: BACKGROUND_GRADIENT,
          backgroundAttachment: "fixed",
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 960,
      lg: 1280,
      xl: 1300,
      x2: 1920,
    },
  },
});

export default theme;
