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

export const ExpenseList = () => {
  const { expenses, dataReceived, handleDeleteExpense } = useExpense();

  if (dataReceived !== true) {
    return <Spinner size="xl"></Spinner>;
  }

  if (expenses?.length !== 0)
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Expense</Th>
            <Th>Category</Th>
            <Th>Amount</Th>
            <Th>Date Added</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses?.map((expense) => (
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
