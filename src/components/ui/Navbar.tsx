import {
  AppBar,
  Button,
  CircularProgress,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { StyledContainer } from "../shared/StyledContainer";
import tinycolor from "tinycolor2";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserStateAtom } from "../../contexts/AuthAtom";
import toast from "react-hot-toast";
import { capitaliseFirstLetters } from "../../utils/helpers";
import useAuthActions from "../../hooks/useAuthActions";

const StyledButton = styled(Button)({
  backgroundColor: "black",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: tinycolor("black").lighten(15).toHexString(),
  },
});

function Navbar() {
  const theme = useTheme();
  const { logoutUser, isLoading } = useAuthActions();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateAtom);

  const handleLogout = async () => {
    const { response, errors } = await logoutUser();

    if (response?.data.success) {
      setCurrentUser({});

      toast.success(response.data.message, {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });
    } else if (errors?.isAxiosError) {
      toast.error("Logout failed.", {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });
    }
  };

  const handleLinkClick = () => {
    if (currentUser.accessToken) {
      toast("Already logged in.", {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });
    }
  };

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
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            currentUser.user?.fullName && (
              <Typography variant="h6" gutterBottom>
                Welcome to Todo App, {capitaliseFirstLetters(currentUser.user.fullName)}
              </Typography>
            )
          )}
          <Stack direction="row" gap={2}>
            <Link to="/sign-up" onClick={handleLinkClick}>
              <StyledButton variant="contained">Sign up</StyledButton>
            </Link>
            {currentUser.accessToken ? (
              <StyledButton variant="contained" onClick={handleLogout}>
                Logout
              </StyledButton>
            ) : (
              <Link to="/log-in">
                <StyledButton variant="contained">Login</StyledButton>
              </Link>
            )}
          </Stack>
        </Stack>
      </StyledContainer>
    </AppBar>
  );
}

export default Navbar;
