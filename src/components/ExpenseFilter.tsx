import { Select } from "@chakra-ui/react";
import { useExpense } from "../context/ExpenseContext";
import { useState } from "react";

interface Props {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ExpenseFilter = ({
  selectedCategory,
  onCategoryChange,
}: Props) => {
  const { expenses } = useExpense();

  return (
    <Select
      placeholder="Filter by category"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {expenses?.map((expense) => (
        <option key={expense.id} value={expense.category}>
          {expense.category}
        </option>
      ))}
    </Select>
  );
};
