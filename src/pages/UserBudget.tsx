import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";
import { BudgetPlan } from "../components/Budgeting/BudgetPlan";

export const UserBudget = () => {
  return (
    <div>
      <BudgetForm />
      <BudgetTable />
      <BudgetPlan />
    </div>
  );
};
