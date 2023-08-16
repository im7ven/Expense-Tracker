import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";
import { BudgetRemoveModal } from "../components/Budgeting/BudgetRemoveModal";

export const UserBudget = () => {
  return (
    <div>
      <BudgetForm />
      <BudgetTable />
      <BudgetPlan />
      <BudgetRemoveModal />
    </div>
  );
};
