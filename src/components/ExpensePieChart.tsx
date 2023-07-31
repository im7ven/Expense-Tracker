import { useExpense } from "../context/ExpenseContext";
import { HStack, ScaleFade, useDisclosure } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
interface ExpenseObj {
  category: string;
  amount: number;
}

export const ExpensePieChart = () => {
  const { expenses } = useExpense();

  const expenseObj: ExpenseObj[] = [];
  expenses?.forEach((e) => {
    const existingCategory = expenseObj.find(
      (obj) => obj.category === e.category
    );
    if (existingCategory) {
      existingCategory.amount += parseFloat(e.amount);
    } else {
      expenseObj.push({ category: e.category, amount: parseFloat(e.amount) });
    }
  });
  console.log(expenseObj);
  console.log(expenses);

  const data = {
    labels: expenseObj.map((expense) => expense.category),
    datasets: [
      {
        data: expenseObj.map((expense) => expense.amount),
        backgroundColor: [
          "#6200F5",
          "#E4BA00",
          "#232323",
          "#FF2C2C",
          "#78D300",
          "#00C2D4",
          "#8A00D4",
          "#00D463",
          "#0063D4",
          "#D400C9",
          "#D40063",
          "#09D6FF",
          "#DCD387",
        ],
      },
    ],
  };

  if (expenses?.length !== 0)
    return (
      <HStack>
        <Pie data={data} />
      </HStack>
    );
};
