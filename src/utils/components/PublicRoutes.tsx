import { useRecoilValue } from "recoil";
import { currentUserStateAtom } from "../../contexts/AuthAtom";
import { Navigate, Outlet } from "react-router-dom";
import { useMemo } from "react";
import useAuthActions from "../../hooks/useAuthActions";
import { CircularProgress } from "@mui/material";

function PublicRoutes() {
  const currentUser = useRecoilValue(currentUserStateAtom);
  const { isLoading } = useAuthActions();

  const route = useMemo(() => {
    if (currentUser.accessToken) {
      return <Navigate to="/" replace />;
    } else {
      return <Outlet />;
    }
  }, [currentUser.accessToken]);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return route;
}

export default PublicRoutes;
