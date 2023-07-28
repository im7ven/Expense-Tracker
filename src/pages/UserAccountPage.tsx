import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

export const UserAccountPage = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  console.log("TEST", user);

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
      <p>
        {user?.displayName === ""
          ? "Welcome to the expense tracker app"
          : "Welcome back, " + user?.displayName}
      </p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
