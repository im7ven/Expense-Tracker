import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomeLayout } from "./pages/HomeLayout";
import { SignupPage } from "./pages/Signup";
import { UserAccountPage } from "./pages/UserAccountPage";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";
import { UserBudget } from "./pages/UserBudget";
import { UserBudgetProvider } from "./context/UserBudgetContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserAuthContextProvider>
        <ExpenseContextProvider>
          <HomeLayout />
        </ExpenseContextProvider>
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
        <ExpenseContextProvider>
          <UserBudgetProvider>
            <PrivateRoutes />
          </UserBudgetProvider>
        </ExpenseContextProvider>
      </UserAuthContextProvider>
    ),
    children: [
      { path: "/useraccount", element: <UserAccountPage /> },
      { path: "/userbudget", element: <UserBudget /> },
    ],
  },
]);

export default router;
