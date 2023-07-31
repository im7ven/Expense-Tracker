import { Spinner } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { UserLayout } from "../pages/UserLayout";

export const PrivateRoutes = () => {
  const { user, authStateRestored } = useUserAuth();

  if (!authStateRestored) {
    return <Spinner></Spinner>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <UserLayout />;
  }
};
