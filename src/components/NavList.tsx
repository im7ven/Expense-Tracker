import { HStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

export const NavList = () => {
  const { signOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStack>
      <Link to="/useraccount">Home</Link>
      <Link to="/userbudget">Budget</Link>
      <Text onClick={handleLogout}>Logout</Text>
    </HStack>
  );
};
