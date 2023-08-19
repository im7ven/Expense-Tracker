import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ExpenseFilter } from "../components/Expense/ExpenseFilter";
import { ExpenseForm } from "../components/Expense/ExpenseForm";
import { ExpenseList } from "../components/Expense/ExpenseList";
import { ExpensePieChart } from "../components/Expense/ExpensePieChart";
import { ExpensePlaceholder } from "../components/Expense/ExpensePlaceholder";
import { ExpenseTable } from "../components/Expense/ExpenseTable";
import { useExpense } from "../context/ExpenseContext";

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
    <SimpleGrid mt={10} padding={6} spacing={5} columns={{ base: 1, xl: 2 }}>
      <Box>
        {isFormVisible ? (
          <ExpenseForm onCloseForm={handleCloseExpenseForm} />
        ) : null}

        <Flex my={3} alignItems="center">
          <Stack>
            <Button onClick={() => setFormVisibility(true)}>Add Expense</Button>
            <ExpenseFilter />
          </Stack>
          <Spacer />
          <Box>
            <Stat px={2}>
              <StatLabel> Expense Total</StatLabel>
              <StatNumber>${totalExpenseAmount}</StatNumber>
            </Stat>
          </Box>
        </Flex>
        {expenses?.length === 0 ? (
          <ExpensePlaceholder children="You have no current expense..." />
        ) : (
          expenseDataRender
        )}
      </Box>

      <ExpensePieChart />
    </SimpleGrid>
  );
};
