import { AppBar, Button, Stack, styled, useTheme } from "@mui/material";
import { StyledContainer } from "../shared/StyledContainer";
import tinycolor from "tinycolor2";
import { Link } from "react-router-dom";

const StyledButton = styled(Button)({
  backgroundColor: "black",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: tinycolor("black").lighten(15).toHexString(),
  },
});

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: tinycolor(theme.palette.info.main).darken(5).toHexString() }}
    >
      <StyledContainer sx={{ padding: "1rem" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Button
              variant="text"
              color="inherit"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "whitesmoke",
              }}
            >
              TodoApp
            </Button>
          </Link>
          <Stack direction="row" gap={2}>
            <Link to="/sign-up">
              <StyledButton variant="contained">Sign up</StyledButton>
            </Link>
            <Link to="/log-in">
              <StyledButton variant="contained">Login</StyledButton>
            </Link>
          </Stack>
        </Stack>
      </StyledContainer>
    </AppBar>
  );
}

export default Navbar;
