import Navbar from "./components/ui/Navbar";
import { StyledContainer } from "./components/shared/StyledContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "@mui/icons-material";
import useAuthActions from "./hooks/useAuthActions";
import SpecialRoutes from "./utils/components/SpecialRoutes";
import { useDebouncedEffect } from "./hooks/useDebounceEffect";

function App() {
  const { refreshAccessToken } = useAuthActions();

  useDebouncedEffect(refreshAccessToken, 500);

  return (
    <Router>
      <Navbar />
      <StyledContainer>
        <Routes>
          <Route element={<SpecialRoutes type="PRIVATE" />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<SpecialRoutes type="PUBLIC" />}>
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/log-in" element={<Login />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </StyledContainer>
      <Toaster />
    </Router>
  );
}

export default App;
