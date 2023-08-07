import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

export const NavMenu = () => {
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
    <Menu>
      <MenuButton as={Button}></MenuButton>
      <MenuList>
        <MenuItem>
          <Link to="useraccount">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="userbudget">Budgeting</Link>
        </MenuItem>
        <MenuItem>
          <Text onClick={handleLogout}>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
