import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { auth } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

export const UserLayout = () => {
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

  const menuBtn = useBreakpointValue({ base: <FiMenu />, md: "Profile" });
  const menuIcon = useBreakpointValue({ md: <FiChevronDown /> });

  return (
    <>
      <NavBar>
        <Menu>
          <MenuButton bg="brand.secondary" as={Button} rightIcon={menuIcon}>
            {menuBtn}
          </MenuButton>
          <MenuList>
            <MenuItem>{auth.currentUser?.displayName}</MenuItem>
            <MenuItem>{auth.currentUser?.email}</MenuItem>
            <MenuItem fontWeight="bold" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </NavBar>
      <Outlet />
    </>
  );
};
