import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useExpense } from "../../context/ExpenseContext";
import categories from "../Expense/ExpenseCategoryData";

interface ExpenseFormInputs {
  expenseName: string;
  category: string;
  amount: string;
  date: string;
}

interface Props {
  onCloseForm: () => void;
}

export const ExpenseForm = ({ onCloseForm }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ExpenseFormInputs>();
  const { addExpense } = useExpense();

  const onSubmit = async (data: ExpenseFormInputs) => {
    try {
      await addExpense(data.expenseName, data.category, data.amount, data.date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      as={motion.div}
      transition={{ duration: "0.3" }}
      animate={{ y: [-40, 0] }}
    >
      <HStack justify="space-between" mb={5}>
        <Heading size="lg">Fill out the form to add expenses</Heading>
        <CloseButton
          size="lg"
          alignSelf="right"
          onClick={() => onCloseForm()}
        />
      </HStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.expenseName} mb={4}>
          <FormLabel>Expense</FormLabel>
          <Input
            {...register("expenseName", {
              required: "Expense is required.",
              maxLength: { value: 16, message: "Maximum of 16 characters." },
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
            type="number"
            {...register("amount", {
              required: "Amount is required.",
              max: { value: 9999, message: "Maximum amount of 9999" },
            })}
            placeholder="Enter the amount"
          />
          <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.amount} mb={4}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            {...register("date", {
              required: "Date is required.",
            })}
          />
          <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
        </FormControl>

        <Button bg="brand.tertiary" width="100%" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
