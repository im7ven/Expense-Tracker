import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useBreakpointValue } from "@chakra-ui/react";
import { NavMenu } from "../components/NavMenu";
import { NavList } from "../components/NavList";

export const UserLayout = () => {
  const navRender = useBreakpointValue({
    base: <NavMenu />,
    md: <NavList />,
  });

  return (
    <>
      <NavBar>{navRender}</NavBar>
      <Outlet />
    </>
  );
};
