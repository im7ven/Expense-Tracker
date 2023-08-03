import {
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useExpense } from "../context/ExpenseContext";

interface Props {
  selectedCategory: string;
}

export const ExpenseList = ({ selectedCategory }: Props) => {
  const { expenses, dataReceived, handleDeleteExpense } = useExpense();

  const filteredExpenses = expenses?.every(
    (e) => e.category !== selectedCategory
  )
    ? expenses
    : expenses?.filter((expense) => expense.category === selectedCategory);
  console.log(selectedCategory);

  if (dataReceived !== true) {
    return <Spinner size="xl"></Spinner>;
  }

  if (expenses?.length !== 0)
    return (
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Expense</Th>
            <Th>Category</Th>
            <Th>Amount</Th>
            <Th>Date </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredExpenses?.map((expense) => (
            <Tr key={expense.id}>
              <Td>{expense.expenseName}</Td>
              <Td>{expense.category}</Td>
              <Td>{expense.amount}</Td>
              <Td>{expense.date}</Td>
              <Td>
                <Button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
};
