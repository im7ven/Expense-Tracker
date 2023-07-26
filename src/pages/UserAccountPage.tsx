import {
  User,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserAccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      // if (currentUser?.displayName === null) {
      //   updateName(currentUser);
      // }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // const updateName = async (currentUser: User) => {
  //   setUser(currentUser);
  //   try {
  //     await updateProfile(currentUser, {
  //       displayName: user?.displayName,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
