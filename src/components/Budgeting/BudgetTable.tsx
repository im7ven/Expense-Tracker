import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useExpense } from "../../context/ExpenseContext";
import { useBudget } from "../../context/UserBudgetContext";

export const BudgetTable = () => {
  const { expenses } = useExpense();
  const { budget } = useBudget();

  const budgetExpense = expenses?.filter((expense) => {
    if (budget !== undefined) {
      expense.date >= budget[0].startDate;
    }
  });

  console.log(budgetExpense);
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Expense</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {budgetExpense?.map((expense) => (
          <Tr>
            <Td>{expense.expenseName}</Td>
            <Td>{expense.amount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
