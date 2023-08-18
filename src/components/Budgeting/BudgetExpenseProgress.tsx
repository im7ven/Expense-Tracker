import {
  CircularProgress,
  CircularProgressLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useBudgetProgress } from "../../context/BudgetPeriodContext";
import { useBudgetFeedback } from "../../context/BudgetFeedbackContext";

export const BudgetExpenseProgress = () => {
  const { budgetExpenseTotal, expenseProgress } = useBudgetProgress();
  const { progressColor } = useBudgetFeedback();

  // console.log("Date Progress ", budgetDateProgress);
  // console.log("Ex Progress", expenseProgress);
  // console.log("color:", progressColor);

  return (
    <CircularProgress
      size="250px"
      value={expenseProgress}
      color={progressColor}
    >
      <CircularProgressLabel fontSize="xl">
        <Stack>
          <Text fontWeight="bold">Expense Total :</Text>
          <Text fontWeight="bold" fontSize="2xl" color={progressColor}>
            ${budgetExpenseTotal?.toFixed(2)}
          </Text>
        </Stack>
      </CircularProgressLabel>
    </CircularProgress>
  );
};
