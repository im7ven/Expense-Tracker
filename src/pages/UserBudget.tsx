import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";
import { BudgetRemoveModal } from "../components/Budgeting/BudgetRemoveModal";
import { useBudget } from "../context/UserBudgetContext";
import { ActiveBudgetAlert } from "../components/Budgeting/ActiveBudgetAlert";
import { useState } from "react";

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
    <div>
      {budget && budget.length > 0 ? (
        showBudgetAlert && (
          <ActiveBudgetAlert onClose={handleExpenseAlertVisibility} />
        )
      ) : (
        <BudgetForm showActiveBudgetAlert={showAlert} />
      )}
      <BudgetTable />
      <BudgetPlan />
      <BudgetRemoveModal />
    </div>
  );
};
