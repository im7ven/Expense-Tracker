import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ExpenseFilter } from "../components/ExpenseFilter";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpensePieChart } from "../components/ExpensePieChart";
import { useExpense } from "../context/ExpenseContext";
import { ExpenseTable } from "../components/ExpenseTable";
import { ExpenseList } from "../components/ExpenseList";

export const UserAccountPage = () => {
  const [isFormVisible, setFormVisibility] = useState(false);
  const { expenses } = useExpense();

  const handleCloseExpenseForm = () => {
    setFormVisibility(false);
  };

  const expenseDataRender = useBreakpointValue({
    base: <ExpenseList />,
    sm: <ExpenseTable />,
  });

  const totalExpenseAmount = expenses
    ?.reduce((acc, expense) => {
      return (acc += parseInt(expense.amount));
    }, 0)
    .toFixed(2);

  return (
    <SimpleGrid mt={10} padding={6} spacing={5} columns={{ base: 1, lg: 2 }}>
      <Box>
        {isFormVisible ? (
          <ExpenseForm onCloseForm={handleCloseExpenseForm} />
        ) : null}

        <Flex>
          <HStack>
            <ExpenseFilter />
            <Button colorScheme="green" onClick={() => setFormVisibility(true)}>
              Add Expense
            </Button>
          </HStack>
          <Spacer />
          <Box>
            <Stat>
              <StatLabel>Total</StatLabel>
              <StatNumber>${totalExpenseAmount}</StatNumber>
            </Stat>
          </Box>
        </Flex>
        {expenseDataRender}
      </Box>

      <ExpensePieChart />
    </SimpleGrid>
  );
};
