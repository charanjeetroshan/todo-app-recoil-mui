import Navbar from "./components/ui/Navbar";
import { StyledContainer } from "./components/shared/StyledContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/components/PrivateRoutes";
import { Dashboard } from "@mui/icons-material";
import PublicRoutes from "./utils/components/PublicRoutes";
import { useLayoutEffect } from "react";
import useAuthActions from "./hooks/useAuthActions";

function App() {
  const { refreshAccessToken } = useAuthActions();

  useLayoutEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  return (
    <Router>
      <Navbar />
      <StyledContainer>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PublicRoutes />}>
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
