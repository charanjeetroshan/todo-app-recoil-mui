import { useRecoilValue } from "recoil";
import { currentUserStateAtom } from "../../contexts/AuthAtom";
import { Navigate, Outlet } from "react-router-dom";

type SpecialRoutesProps = {
  type: "PUBLIC" | "PRIVATE";
};

function SpecialRoutes({ type }: SpecialRoutesProps) {
  const currentUser = useRecoilValue(currentUserStateAtom);

  if (type === "PUBLIC") {
    return currentUser.accessToken ? <Navigate to="/" /> : <Outlet />;
  }

  if (type === "PRIVATE") {
    return currentUser.accessToken ? <Outlet /> : <Navigate to="/log-in" />;
  }
}

export default SpecialRoutes;
