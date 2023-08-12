import {
  CloseButton,
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
    <List spacing={5}>
      <ListItem>
        <HStack>
          {expenseHeadings.map((item) => (
            <>
              <Heading color="brand.text" size="xs" key={item}>
                {item}
              </Heading>
              <Spacer />
            </>
          ))}
        </HStack>
      </ListItem>
      {expenses?.map((expense) => (
        <ListItem key={expense.id}>
          <HStack>
            <Text color="#fff">{expense.expenseName}</Text>
            <Spacer />
            <Text color="#fff"> {expense.category}</Text>
            <Spacer />
            <Text ml={6} color="#fff">
              {expense.amount}
            </Text>
            <Spacer />

            <CloseButton
              onClick={() => handleDeleteExpense(expense.id)}
              bg="brand.primary"
            />
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
