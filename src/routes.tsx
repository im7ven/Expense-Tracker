import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./pages/Layout";
import { SignupPage } from "./pages/Signup";
import { UserAccountPage } from "./pages/UserAccountPage";
import { PrivateRoutes } from "./components/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [{ path: "/useraccount", element: <UserAccountPage /> }],
  },
]);

export default router;
