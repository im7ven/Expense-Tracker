import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

export const PrivateRoutes = () => {
  if (auth.currentUser === null) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
