import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";
import { BudgetRemoveModal } from "../components/Budgeting/BudgetRemoveModal";
import { useBudget } from "../context/UserBudgetContext";
import { ActiveBudgetAlert } from "../components/Budgeting/ActiveBudgetAlert";

export const UserBudget = () => {
  const { budget } = useBudget();

  return (
    <div>
      {budget && budget.length > 0 ? <ActiveBudgetAlert /> : <BudgetForm />}
      <BudgetTable />
      <BudgetPlan />
      <BudgetRemoveModal />
    </div>
  );
};
