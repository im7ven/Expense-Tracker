import { Box, Select } from "@chakra-ui/react";
import { useExpense } from "../context/ExpenseContext";

interface Props {
  selectedCategory: string;
  handleSelectedCategory: (category: string) => void;
}

export const ExpenseFilter = ({
  selectedCategory,
  handleSelectedCategory,
}: Props) => {
  const { expenses } = useExpense();

  return (
    <Box display="inline-block">
      <Select
        bg="#232323"
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
