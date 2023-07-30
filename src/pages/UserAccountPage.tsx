import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { auth } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

export const UserAccountPage = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>{auth.currentUser?.displayName}</p>
      <Button onClick={handleLogout}>Logout</Button>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};
