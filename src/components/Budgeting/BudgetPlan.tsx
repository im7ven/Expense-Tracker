import {
  Box,
  Center,
  Flex,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useBudgetFeedback } from "../../context/BudgetFeedbackContext";
import { useBudgetProgress } from "../../context/BudgetPeriodContext";
import { useBudget } from "../../context/UserBudgetContext";
import { BudgetExpenseProgress } from "./BudgetExpenseProgress";
import { BudgetRemoveModal } from "./BudgetRemoveModal";
import { SuggestionAlert } from "./SuggestionAlert";

export const BudgetPlan = () => {
  const { budget } = useBudget();
  const { budgetDateProgress, budgetExpenses } = useBudgetProgress();
  const { showSuggestion } = useBudgetFeedback();

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
      <Flex justify={"space-evenly"}>
        <Box>
          <Text color="brand.text" fontWeight="bold">
            Start Date
          </Text>
          <Text fontSize="xl">{budgetStartDate}</Text>
        </Box>
        <Box width="80%" padding={3}>
          <Text fontWeight="semibold" textAlign="center">
            Days Elapsed
          </Text>
          <Progress value={budgetDateProgress} borderRadius={5} />
        </Box>

        <Box>
          <Text color="brand.text" fontWeight="bold">
            End Date
          </Text>
          <Text fontSize="xl">{budgetEndDate}</Text>
        </Box>
      </Flex>
      {budgetExpenses && budgetExpenses?.length > 0 ? (
        <>
          <Box my={3}>{showSuggestion && <SuggestionAlert />}</Box>
          <Center mb={4}>
            <BudgetExpenseProgress />
          </Center>{" "}
        </>
      ) : null}
      <BudgetRemoveModal />
    </>
  );
};
