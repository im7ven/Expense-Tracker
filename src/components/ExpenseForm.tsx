import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { db } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";
import categories from "./ExpenseCategoryData";

interface ExpenseData {
  expenseName: string;
  category: string;
  amount: string;
  date: string;
}

export const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUserAuth();

  const date = new Date().getDay().toString();

  const expenseData: ExpenseData = {
    expenseName,
    category,
    amount,
    date,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (user?.uid) {
        const userExpenseRef = collection(db, "users", user?.uid, "expenses");
        await addDoc(userExpenseRef, expenseData);
      }
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
