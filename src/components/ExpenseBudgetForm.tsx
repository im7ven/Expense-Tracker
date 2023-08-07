import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const ExpenseBudgetForm = () => {
  return (
    <form>
      <FormControl>
        <FormLabel>Start date</FormLabel>
        <Input type="date" />
      </FormControl>
      <FormControl>
        <FormLabel>End date</FormLabel>
        <Input type="date" />
      </FormControl>
      <FormControl>
        <FormLabel>Budget Amount</FormLabel>
        <Input placeholder="Enter budget amount" />
      </FormControl>
    </form>
  );
};
