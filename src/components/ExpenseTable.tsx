import {
  Button,
  CloseButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { useExpense } from "../context/ExpenseContext";

export const ExpenseTable = () => {
  const { expenses, dataReceived, handleDeleteExpense, selectedCategory } =
    useExpense();

  const filteredExpenses = expenses?.every(
    (e) => e.category !== selectedCategory
  )
    ? expenses
    : expenses?.filter((expense) => expense.category === selectedCategory);

  const removeBtnLabel = useBreakpointValue({
    base: <IoClose size="20px" />,
    md: "Remove",
  });

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
                <CloseButton
                  bg="brand.primary"
                  onClick={() => handleDeleteExpense(expense.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
};
