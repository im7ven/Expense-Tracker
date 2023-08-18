import {
  CircularProgress,
  CircularProgressLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useBudgetProgress } from "../../context/BudgetPeriodContext";
import { useBudget } from "../../context/UserBudgetContext";

export const BudgetExpenseProgress = () => {
  const { budgetExpenseTotal } = useBudgetProgress();
  const { budget } = useBudget();

  const handleBudgetProgress = () => {
    if (budgetAmount && budgetExpenseTotal)
      return (budgetExpenseTotal / parseInt(budgetAmount)) * 100;
  };

  const budgetAmount = budget?.[0]?.amount;

  return (
    <CircularProgress
      size="250px"
      value={handleBudgetProgress()}
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
  );
};
