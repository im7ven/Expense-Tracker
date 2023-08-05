import { Flex, HStack, Heading, Spacer } from "@chakra-ui/react";
import { ReactNode } from "react";
import { GiTakeMyMoney } from "react-icons/gi";

interface Props {
  children?: ReactNode;
}

export const NavBar = ({ children }: Props) => {
  return (
    <Flex padding={3} alignItems="center">
      <HStack>
        <GiTakeMyMoney color="#2cb67d" size="60px" />
        <Heading>Expense Tracker</Heading>
      </HStack>
      <Spacer />
      {children}
    </Flex>
  );
};
