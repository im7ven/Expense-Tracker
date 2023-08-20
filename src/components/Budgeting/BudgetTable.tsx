import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useExpense } from "../../context/ExpenseContext";
import { useBudget } from "../../context/UserBudgetContext";

export const BudgetTable = () => {
  const { expenses } = useExpense();
  const { budget } = useBudget();
  const budgetStartDate = budget?.[0]?.startDate;

  const budgetExpense = expenses?.filter((expense) => {
    return budgetStartDate && expense.date >= budgetStartDate;
  });

  return (
    <>
      <Heading mb={3} size="md">
        Budget Expenses
      </Heading>
      <Table bg="brand.secondaryBg" borderTopRadius="10px">
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
              <Td>${parseInt(expense.amount).toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
