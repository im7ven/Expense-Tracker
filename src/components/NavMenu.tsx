import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
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
      <MenuButton as={Button}>
        <IoMenu />
      </MenuButton>
      <MenuList bg="brand.secondaryBg">
        <MenuItem mb={1} bg="brand.secondary">
          <Text fontWeight="semibold">
            <Link to="useraccount">Expense</Link>
          </Text>
        </MenuItem>
        <MenuItem mb={1} bg="brand.secondary">
          <Text fontWeight="semibold">
            <Link to="userbudget">Budgeting</Link>
          </Text>
        </MenuItem>
        <MenuItem bg="brand.primary">
          <Text fontWeight="semibold" onClick={handleLogout}>
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
