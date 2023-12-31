import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useBudget } from "../../context/UserBudgetContext";

interface BudgetFormInput {
  startDate: string;
  endDate: string;
  amount: string;
}

export const BudgetForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormInput>();

  const { addBudget } = useBudget();
  const startDate = watch("startDate");

  const onSubmit = (data: BudgetFormInput) => {
    try {
      addBudget(data.startDate, data.endDate, data.amount);
    } catch (err) {
      console.log(err);
    }
  };

  const validateEndDate = (value: string) => {
    if (value && startDate && new Date(value) <= new Date(startDate)) {
      return "End date must be after the start date";
    }
    if (value && new Date(value) < new Date()) {
      console.log(new Date(value));
      return "End date must be at least one day after the current date";
    }
    return true;
  };

  return (
    <Box mx="auto" maxWidth="3xl" padding={3}>
      <Heading mb={3} size="lg">
        Create a Budget Plan
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={3} isInvalid={!!errors.startDate}>
          <FormLabel>Start date</FormLabel>
          <Input
            {...register("startDate", {
              required: "Start Date is required",
            })}
            type="date"
          />
          {errors.startDate && (
            <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={3} isInvalid={!!errors.endDate}>
          <FormLabel>End date</FormLabel>
          <Input
            {...register("endDate", {
              required: "End date is required",
              validate: validateEndDate,
            })}
            type="date"
          />
          {errors.endDate && (
            <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={3} isInvalid={!!errors.amount}>
          <FormLabel>Budget Amount</FormLabel>
          <Input
            {...register("amount", { required: "Amount is required" })}
            placeholder="Enter budget amount"
          />
          {errors.amount && (
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button width="100%" bg="brand.tertiary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
