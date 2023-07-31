import { Box, Button, Center, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useUserAuth } from "../context/UserAuthContext";
import { auth } from "../config/firebase";

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

  return (
    <>
      <NavBar>
        <>
          <Box>
            <Text>{auth.currentUser?.displayName}</Text>
            <Center>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Center>
          </Box>
        </>
      </NavBar>
      <Outlet />
    </>
  );
};
