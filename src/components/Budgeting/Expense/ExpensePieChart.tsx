import { Heading, VStack } from "@chakra-ui/react";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  PieController,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useExpense } from "../context/ExpenseContext";

ChartJS.register(ArcElement, Tooltip, Legend, PieController);
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
          "#C6C04C",
          "#4CC77D",
          "#BA5B5B",
          "#5A3D85",
          "#79B167",
          "#935B1B",
          "#7897AC",
          "#FA5C39",
          "#9545FD",
          "#C293C7",
          "#F57373",
          "#7B544B",
          "#232323",
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
      <VStack width="100%" maxHeight="450px">
        <Heading textAlign="center" mb={5}>
          Visualize you're Expenses
        </Heading>

        <Pie data={data} options={options} />
      </VStack>
    );
};
