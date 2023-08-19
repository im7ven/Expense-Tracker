import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";
import { BudgetRemoveModal } from "../components/Budgeting/BudgetRemoveModal";
import { useBudget } from "../context/UserBudgetContext";
import { ActiveBudgetAlert } from "../components/Budgeting/ActiveBudgetAlert";
import { useState } from "react";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";

export const UserBudget = () => {
  const { budget } = useBudget();
  const [showBudgetAlert, setShowBudgetAlert] = useState(true);

  const handleExpenseAlertVisibility = () => {
    setShowBudgetAlert(false);
  };

  const showAlert = () => {
    setShowBudgetAlert(true);
  };

  return (
    <>
      {budget && budget.length > 0 ? (
        showBudgetAlert && (
          <ActiveBudgetAlert onClose={handleExpenseAlertVisibility} />
        )
      ) : (
        <BudgetForm showActiveBudgetAlert={showAlert} />
      )}
      <Box px={3} mt={8}>
        <SimpleGrid spacing="40px" columns={{ base: 1, lg: 2 }}>
          <GridItem>
            <BudgetTable />
          </GridItem>
          <GridItem>
            <BudgetPlan />
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};
