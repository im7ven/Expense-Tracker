import { Button } from "@chakra-ui/react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export const UserAccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
      <p>Current User : {user?.displayName}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
