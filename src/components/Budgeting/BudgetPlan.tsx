import {
  Box,
  HStack,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useBudget } from "../../context/UserBudgetContext";

export const BudgetPlan = () => {
  const { budget } = useBudget();

  const budgetStartDate = budget?.[0]?.startDate;
  const budgetEndDate = budget?.[0]?.endDate;

  let progress = 0;

  if (budgetStartDate && budgetEndDate) {
    const currentDate = new Date();
    const startDate = new Date(budgetStartDate);
    const endDate = new Date(budgetEndDate);

    if (currentDate >= startDate && currentDate <= endDate) {
      const totalDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const elapsedDays =
        (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      progress = (elapsedDays / totalDays) * 100;
    }
  }

  return (
    <Box>
      <HStack>
        <Stat>
          <StatLabel>{budget?.[0]?.startDate}</StatLabel>
          <StatNumber>£0.00</StatNumber>
        </Stat>
        <Progress hasStripe value={progress} />
      </HStack>
    </Box>
  );
};
