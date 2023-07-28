import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Spinner } from "@chakra-ui/react";

export const PrivateRoutes = () => {
  const { user, authStateRestored } = useUserAuth();

  if (!authStateRestored) {
    return <Spinner></Spinner>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
