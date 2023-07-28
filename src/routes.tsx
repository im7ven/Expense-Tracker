import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./pages/Layout";
import { SignupPage } from "./pages/Signup";
import { UserAccountPage } from "./pages/UserAccountPage";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { UserAuthContextProvider } from "./context/UserAuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserAuthContextProvider>
        <Layout />
      </UserAuthContextProvider>
    ),
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: (
      <UserAuthContextProvider>
        <PrivateRoutes />
      </UserAuthContextProvider>
    ),
    children: [{ path: "/useraccount", element: <UserAccountPage /> }],
  },
]);

export default router;
