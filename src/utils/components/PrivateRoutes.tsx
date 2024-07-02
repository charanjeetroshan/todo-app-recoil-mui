import { useRecoilValue } from "recoil";
import { currentUserStateAtom } from "../../contexts/AuthAtom";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const currentUser = useRecoilValue(currentUserStateAtom);

  return currentUser.accessToken ? <Outlet /> : <Navigate to="/log-in" />;
}

export default PrivateRoutes;
