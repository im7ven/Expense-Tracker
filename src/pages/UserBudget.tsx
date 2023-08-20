import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";
import { useBudget } from "../context/UserBudgetContext";
import { ActiveBudgetAlert } from "../components/Budgeting/ActiveBudgetAlert";
import { useEffect, useState } from "react";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ExpensePlaceholder } from "../components/Expense/ExpensePlaceholder";
import { useBudgetProgress } from "../context/BudgetPeriodContext";
import { BudgetEndModal } from "../components/Budgeting/BudgetEndModal";

export const UserBudget = () => {
  const { budget, handleRemoveBudget } = useBudget();
  const { budgetExpenses, budgetDateProgress } = useBudgetProgress();
  const [activeBudgetExpenses, setActiveBudgetExpense] = useState(false);
  const [isBudgetEnded, setIsBudgetEnded] = useState(false);

  useEffect(() => {
    budget?.length === 1 && budgetDateProgress >= 100 && setIsBudgetEnded(true);
  }, [budgetDateProgress]);

  const handleBudgetEnd = () => {
    if (budget) {
      handleRemoveBudget(budget?.[0]?.id);
      setIsBudgetEnded(false);
    }
  };

  useEffect(() => {
    if (budgetExpenses) {
      budgetExpenses.length > 0
        ? setActiveBudgetExpense(true)
        : setActiveBudgetExpense(false);
    }
  }, [budgetExpenses]);

  return (
    <Box py={5}>
      <BudgetEndModal isOpen={isBudgetEnded} onClose={handleBudgetEnd} />
      {budget && budget.length > 0 ? (
        <>
          <ActiveBudgetAlert />
          <Box px={3} mt={8}>
            <SimpleGrid spacing="40px" columns={{ base: 1, lg: 2 }}>
              <GridItem>
                {!activeBudgetExpenses ? (
                  <ExpensePlaceholder children="You have no current budget expenses..." />
                ) : (
                  <BudgetTable />
                )}
              </GridItem>
              <GridItem>
                <BudgetPlan />
              </GridItem>
            </SimpleGrid>
          </Box>
        </>
      ) : (
        <BudgetForm />
      )}
    </Box>
  );
};
