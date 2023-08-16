import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
// import { differenceInMilliseconds, startOfDay } from "date-fns";
import { useExpense } from "../../context/ExpenseContext";
import { useBudget } from "../../context/UserBudgetContext";

export const BudgetPlan = () => {
  const { budget } = useBudget();
  const { expenses } = useExpense();

  const budgetStartDate = budget?.[0]?.startDate;
  const budgetEndDate = budget?.[0]?.endDate;
  const budgetAmount = budget?.[0]?.amount;

  // let progress = 0;

  // // ...

  // if (budgetStartDate && budgetEndDate) {
  //   const startDate = startOfDay(new Date(budgetStartDate)); // Convert to start of day in UTC
  //   const endDate = startOfDay(new Date(budgetEndDate)); // Convert to start of day in UTC
  //   const currentDate = new Date(); // Convert to start of day in UTC

  //   if (currentDate >= startDate) {
  //     const totalMillis = differenceInMilliseconds(endDate, startDate);
  //     const elapsedMillis = differenceInMilliseconds(currentDate, startDate);

  //     progress = (elapsedMillis / totalMillis) * 100;
  //   }
  // }
  // console.log("Progress value", progress.toFixed(2));

  const budgetExpenses = expenses?.filter((expense) => {
    return (
      budgetStartDate &&
      budgetEndDate &&
      expense.date >= budgetStartDate &&
      expense.date <= budgetEndDate
    );
  });

  const budgetExpenseTotal = budgetExpenses?.reduce((acc, expense) => {
    return (acc += parseInt(expense.amount));
  }, 0);

  return (
    <>
      <Box textAlign="center">
        <Stat>
          <StatLabel fontWeight="bold" fontSize="md" color="brand.text">
            Budget set at
          </StatLabel>
          <StatNumber>
            ${budgetAmount && parseInt(budgetAmount).toFixed(2)}
          </StatNumber>
        </Stat>
      </Box>
      <Divider />
      <Flex justify={"space-evenly"}>
        <Box>
          <Text color="brand.text" fontWeight="bold">
            Start Date
          </Text>
          <Text fontSize="xl">{budgetStartDate}</Text>
        </Box>

        <div>
          <Text color="brand.text" fontWeight="bold">
            End Date
          </Text>
          <Text fontSize="xl">{budgetEndDate}</Text>
        </div>
      </Flex>
      <Center>
        <CircularProgress
          size="250px"
          value={40}
          color={
            budgetExpenseTotal &&
            budgetAmount &&
            parseInt(budgetAmount) >= budgetExpenseTotal
              ? "green.500"
              : "red.500"
          }
        >
          <CircularProgressLabel fontSize="xl">
            <Stack>
              <Text>Expense Total :</Text>
              <Text>${budgetExpenseTotal?.toFixed(2)}</Text>
            </Stack>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
    </>
  );
};
