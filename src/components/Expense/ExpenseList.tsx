import {
  CloseButton,
  Divider,
  HStack,
  Heading,
  List,
  ListItem,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useExpense } from "../../context/ExpenseContext";

export const ExpenseList = () => {
  const { expenses, handleDeleteExpense } = useExpense();

  const expenseHeadings = ["Expense", "Category", "Amount"];
  return (
    <>
      <List
        padding={["5px", "2px"]}
        bg="brand.secondaryBg"
        borderTopRadius="10px"
        spacing={3}
      >
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
            <Divider />
            <HStack>
              <Text textAlign="center" color="#fff">
                {expense.expenseName}
              </Text>
              <Spacer />
              <Text textAlign="center" color="#fff">
                {expense.category}
              </Text>
              <Spacer />
              <Text textAlign="center" color="#fff">
                {expense.amount}
              </Text>

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
