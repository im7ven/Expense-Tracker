import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useState } from "react";
import { ExpenseFilter } from "../components/ExpenseFilter";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { ExpensePieChart } from "../components/ExpensePieChart";
import { useExpense } from "../context/ExpenseContext";

export const UserAccountPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFormVisible, setFormVisibility] = useState(false);
  const { expenses } = useExpense();

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCloseExpenseForm = () => {
    setFormVisibility(false);
  };

  const totalExpenseAmount = expenses
    ?.reduce((acc, expense) => {
      return (acc += parseInt(expense.amount));
    }, 0)
    .toFixed(2);

  return (
    <SimpleGrid spacing="50px" padding={6} columns={{ base: 1, lg: 2 }}>
      <Box>
        {isFormVisible ? (
          <ExpenseForm onCloseForm={handleCloseExpenseForm} />
        ) : null}

        <HStack mt={10}>
          <ExpenseFilter
            selectedCategory={selectedCategory}
            handleSelectedCategory={handleSelectedCategory}
          />
          <Button colorScheme="green" onClick={() => setFormVisibility(true)}>
            Add Expense
          </Button>
          <Spacer />
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>${totalExpenseAmount}</StatNumber>
          </Stat>
        </HStack>
        <ExpenseList selectedCategory={selectedCategory} />
      </Box>

      <ExpensePieChart />
    </SimpleGrid>
  );
};
