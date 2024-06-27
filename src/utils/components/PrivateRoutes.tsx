import { useRecoilValue } from "recoil";
import { isUserLoggedInState } from "../../contexts/AuthAtom";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/log-in" />;
}

export default PrivateRoutes;
