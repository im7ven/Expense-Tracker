import { Box, Select } from "@chakra-ui/react";
import { useExpense } from "../../context/ExpenseContext";

export const ExpenseFilter = () => {
  const { expenses, handleSelectedCategory, selectedCategory } = useExpense();

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
        {expenses?.map((expense) => (
          <option key={expense.id} value={expense.category}>
            {expense.category}
          </option>
        ))}
      </Select>
    </Box>
  );
};
