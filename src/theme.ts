import { createTheme, formLabelClasses, outlinedInputClasses } from "@mui/material";
import tinycolor from "tinycolor2";

const theme = createTheme({
  palette: {
    info: {
      main: "#008080",
      contrastText: "#f5f5f5",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.color === "info" && {
            [`& .${formLabelClasses.root}`]: {
              color: theme.palette.info.main,
            },

            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.info.main,
            },
            [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
              {
                borderColor: tinycolor(theme.palette.info.main).darken(5).toHexString(),
              },
          }),
          input: {
            color: theme.palette.info.contrastText,
          },
        }),
      },
    },
  },
});

export default theme;
