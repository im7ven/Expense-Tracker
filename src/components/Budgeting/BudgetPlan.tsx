import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Progress,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useBudget } from "../../context/UserBudgetContext";
import { useBudgetProgress } from "../../context/BudgetPeriodContext";

export const BudgetPlan = () => {
  const { budget } = useBudget();
  const { budgetDateProgress, budgetExpenseTotal } = useBudgetProgress();

  const budgetStartDate = budget?.[0]?.startDate;
  const budgetEndDate = budget?.[0]?.endDate;
  const budgetAmount = budget?.[0]?.amount;

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
        <Box width="80%" padding={3}>
          <Text textAlign="center">Days Elapsed</Text>
          <Progress value={budgetDateProgress} borderRadius={5} />
        </Box>

        <Box>
          <Text color="brand.text" fontWeight="bold">
            End Date
          </Text>
          <Text fontSize="xl">{budgetEndDate}</Text>
        </Box>
      </Flex>
      <Center>
        <CircularProgress
          size="250px"
          // value={handleBudgetProgress()}
          // color={handleProgressColor}
        >
          <CircularProgressLabel fontSize="xl">
            <Stack>
              <Text>Expense Total :</Text>
              <Text fontWeight="bold" fontSize="2xl">
                ${budgetExpenseTotal?.toFixed(2)}
              </Text>
            </Stack>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
    </>
  );
};
