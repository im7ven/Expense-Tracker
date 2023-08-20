import {
  CloseButton,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useExpense } from "../../context/ExpenseContext";

export const ExpenseList = () => {
  const { expenses, handleDeleteExpense } = useExpense();

  const expenseHeadings = ["Expense", "Category", "Amount"];
  return (
    <>
      <List
        padding="5px"
        bg="brand.secondaryBg"
        borderTopRadius="10px"
        spacing={3}
      >
        <ListItem>
          <Flex py={3} width="100%" justify="space-between">
            {expenseHeadings.map((item) => (
              <Heading color="brand.text" size="xs" key={item}>
                {item}
              </Heading>
            ))}
          </Flex>
        </ListItem>
        {expenses?.map((expense) => (
          <ListItem py={2} key={expense.id}>
            <Divider />
            <HStack>
              <Text>{expense.expenseName}</Text>
              <Spacer />
              <Text>{expense.category}</Text>
              <Spacer />
              <Text>{expense.amount}</Text>

              <CloseButton
                ml={1}
                size="sm"
                onClick={() => handleDeleteExpense(expense.id)}
                bg="brand.primary"
              />
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};
