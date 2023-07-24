import { HStack, Heading } from "@chakra-ui/react";
import { GiTakeMyMoney } from "react-icons/gi";

export const NavBar = () => {
  return (
    <HStack bg="#1b1b1b" padding={3}>
      <GiTakeMyMoney color="green" size="60px" />
      <Heading>Expense Tracker</Heading>
    </HStack>
  );
};
