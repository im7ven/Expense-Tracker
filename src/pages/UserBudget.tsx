import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";
import { useBudget } from "../context/UserBudgetContext";
import { ActiveBudgetAlert } from "../components/Budgeting/ActiveBudgetAlert";
import { useEffect, useState } from "react";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ExpensePlaceholder } from "../components/Expense/ExpensePlaceholder";
import { useBudgetProgress } from "../context/BudgetPeriodContext";

export const UserBudget = () => {
  const { budget } = useBudget();
  const { budgetExpenses } = useBudgetProgress();
  const [showBudgetAlert, setShowBudgetAlert] = useState(true);
  const [activeBudgetExpenses, setActiveBudgetExpense] = useState(false);

  const handleExpenseAlertVisibility = () => {
    setShowBudgetAlert(false);
  };

  const showAlert = () => {
    setShowBudgetAlert(true);
  };

  useEffect(() => {
    if (budgetExpenses) {
      budgetExpenses.length > 0
        ? setActiveBudgetExpense(true)
        : setActiveBudgetExpense(false);
    }
  }, [budgetExpenses]);

  return (
    <>
      {budget && budget.length > 0 ? (
        showBudgetAlert && (
          <>
            <ActiveBudgetAlert onClose={handleExpenseAlertVisibility} />
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
        )
      ) : (
        <BudgetForm showActiveBudgetAlert={showAlert} />
      )}
    </>
  );
};
