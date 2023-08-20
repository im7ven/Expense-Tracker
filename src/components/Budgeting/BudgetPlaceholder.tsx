import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useBudget } from "../../context/UserBudgetContext";
import { BudgetRemoveModal } from "./BudgetRemoveModal";

export const BudgetPlaceholder = () => {
  const { budget } = useBudget();

  const startDate = budget?.[0]?.startDate;
  const endDate = budget?.[0]?.endDate;
  const amount = budget?.[0]?.amount;
  return (
    <Box>
      <Flex width="100%">
        <Box>
          <Heading size="small">Start Date</Heading>
          <Text>{startDate}</Text>
        </Box>
        <Spacer />
        <Box>
          <Heading size="small">End Date</Heading>
          <Text>{endDate}</Text>
        </Box>
      </Flex>
      <Heading size="small">Budget Amount</Heading>
      <Text>{amount}</Text>
      <BudgetRemoveModal />
    </Box>
  );
};
