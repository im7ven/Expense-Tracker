import { Button, HStack, Text } from "@chakra-ui/react";
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
    <HStack spacing={5}>
      <Text fontSize="xl">
        <Link to="/useraccount">Expense</Link>
      </Text>
      <Text fontSize="xl">
        <Link to="/userbudget">Budget</Link>
      </Text>
      <Button cursor="pointer" onClick={handleLogout}>
        Logout
      </Button>
    </HStack>
  );
};
