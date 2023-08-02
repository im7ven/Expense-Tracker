import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useExpense } from "../context/ExpenseContext";
import categories from "./ExpenseCategoryData";

interface ExpenseFormInputs {
  expenseName: string;
  category: string;
  amount: string;
}

export const ExpenseForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ExpenseFormInputs>();
  const { addExpense } = useExpense();
  const date = new Date().toDateString();

  const onSubmit = async (data: ExpenseFormInputs) => {
    try {
      await addExpense(data.expenseName, data.category, data.amount, date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.expenseName} mb={4}>
          <FormLabel>Expense</FormLabel>
          <Input
            {...register("expenseName", {
              required: "Expense is required.",
            })}
            placeholder="Enter an expense"
          />
          <FormErrorMessage>{errors.expenseName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.category} mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            {...register("category", {
              required: "Category is required.",
            })}
            placeholder="Select a category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.amount} mb={4}>
          <FormLabel>Amount</FormLabel>
          <Input
            {...register("amount", {
              required: "Amount is required.",
            })}
            placeholder="Enter the amount"
          />
          <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
        </FormControl>
        <Button mt={5} width="100%" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
