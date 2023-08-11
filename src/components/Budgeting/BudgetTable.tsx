import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export const BudgetTable = () => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Expense</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
};
