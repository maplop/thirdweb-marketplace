import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 0, 0)",
      light: "rgba(0, 0, 0, .2)",
    },
    secondary: {
      main: "rgb(250, 250, 250)",
      light: "rgba(250, 250, 250, .3)",
      dark: "rgba(250, 250, 250, .2)",
      contrastText: "rgba(250, 250, 250, .6)",
    },
    info: {
      main: "#323232",
    },
  },
});
