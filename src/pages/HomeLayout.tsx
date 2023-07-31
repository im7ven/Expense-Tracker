import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Button } from "@chakra-ui/react";

export const HomeLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
