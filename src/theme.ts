import { createTheme, formLabelClasses, outlinedInputClasses } from "@mui/material";
import tinycolor from "tinycolor2";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.color === "primary" && {
            [`& .${formLabelClasses.root}`]: {
              color: theme.palette.primary.main,
            },

            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.primary.main,
              [`${theme.breakpoints.up("md")}`]: {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
            [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
              {
                borderColor: tinycolor(theme.palette.primary.main).darken().toHexString(),
              },
            input: {
              color: theme.palette.primary.contrastText,
            },
          }),
        }),
      },
    },
  },
});

export default theme;
