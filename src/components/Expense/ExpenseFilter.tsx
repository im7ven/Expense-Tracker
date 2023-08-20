import { Box, Select } from "@chakra-ui/react";
import { Expense, useExpense } from "../../context/ExpenseContext";

export const ExpenseFilter = () => {
  const { expenses, handleSelectedCategory, selectedCategory } = useExpense();

  const uniqueCategories = new Set();

  const filteredExpenses = expenses?.filter((expense) => {
    if (uniqueCategories.has(expense.category)) {
      return false;
    } else {
      uniqueCategories.add(expense.category);
      return true;
    }
  });
  return (
    <Box display="inline-block">
      <Select
        bg="brand.secondary"
        variant="filled"
        flexGrow={0}
        placeholder="Filter by category"
        value={selectedCategory}
        onChange={(e) => handleSelectedCategory(e.target.value)}
      >
        {filteredExpenses?.map((expense) => (
          <option key={expense.id} value={expense.category}>
            {expense.category}
          </option>
        ))}
      </Select>
    </Box>
  );
};
