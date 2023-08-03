import { Box, Heading } from "@chakra-ui/react";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useExpense } from "../context/ExpenseContext";

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

  const formatTooltipLabel = (tooltipItem: any) => {
    const value = tooltipItem.parsed;
    return value ? `$${value.toFixed(2)}` : "";
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        title: {
          text: "Current Expense Categories",
          display: true,
          padding: 30,
          color: "#fff",
          font: {
            size: 20,
          },
        },
        align: "start",
        position: "bottom",
        labels: {
          color: "#fff",
          boxWidth: 30,
          boxHeight: 30,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: formatTooltipLabel,
        },
      },
    },
  };

  if (expenses?.length !== 0)
    return (
      <Box width="100%">
        <Heading textAlign="center" mb={5}>
          Visualize you're Expenses
        </Heading>
        <Pie data={data} options={options} />
      </Box>
    );
};
