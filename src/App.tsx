import Navbar from "./components/ui/Navbar";
import { StyledContainer } from "./components/shared/StyledContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/components/PrivateRoutes";
import { Dashboard } from "@mui/icons-material";

function App() {
  return (
    <Router>
      <Navbar />
      <StyledContainer>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/log-in" element={<Login />} />
        </Routes>
      </StyledContainer>
      <Toaster />
    </Router>
  );
}

export default App;
