import {
  createTheme,
  formLabelClasses,
  inputBaseClasses,
  outlinedInputClasses,
  selectClasses,
} from "@mui/material";
import tinycolor from "tinycolor2";

const theme = createTheme({
  palette: {
    info: {
      main: "#549",
      contrastText: "#ddd",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.color === "info" && {
            [`& .${formLabelClasses.root}`]: {
              color: theme.palette.info.contrastText,
            },
            [`& .${formLabelClasses.root}.${formLabelClasses.focused}`]: {
              color: theme.palette.info.contrastText,
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
    // The following is not tested
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`& .${selectClasses.icon}`]: {
            fill: theme.palette.info.contrastText,
          },
          [`& .${selectClasses.select}`]: {
            color: "white",
          },
          "&:hover": {
            [`.${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "white",
            },
          },
          [`&.${inputBaseClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: theme.palette.info.main,
          },
          [`&.${inputBaseClasses.focused} .${selectClasses.outlined}`]: {
            color: theme.palette.info.contrastText,
          },
          [`&.${inputBaseClasses.focused} .${selectClasses.icon}`]: {
            fill: theme.palette.info.contrastText,
          },
          [`&.${inputBaseClasses.focused} .${selectClasses.select}`]: {
            outline: "none",
          },
          fieldset: {
            borderColor: "white",
          },
        }),
      },
    },
  },
});

export default theme;
