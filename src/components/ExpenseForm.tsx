import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import categories from "./ExpenseCategoryData";

export const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const { addExpense } = useExpense();

  const date = new Date().toDateString();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      addExpense(expenseName, category, amount, date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Expense</FormLabel>
        <Input
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Enter an expense"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Select
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Select a category "
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the amount"
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
};
