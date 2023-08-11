import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useBudget } from "../context/UserBudgetContext";
import { useState } from "react";

export const ExpenseBudgetForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const { addBudget } = useBudget();

  const handleBudgetSubmit = () => {
    try {
      addBudget(startDate, endDate, amount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleBudgetSubmit}>
      <FormControl>
        <FormLabel>Start date</FormLabel>
        <Input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          type="date"
        />
      </FormControl>
      <FormControl>
        <FormLabel>End date</FormLabel>
        <Input
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          type="date"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Budget Amount</FormLabel>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget amount"
        />
      </FormControl>
    </form>
  );
};
