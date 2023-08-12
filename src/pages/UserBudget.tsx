import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { BudgetForm } from "../components/Budgeting/BudgetForm";

export const UserBudget = () => {
  return (
    <div>
      <BudgetForm />
      <BudgetTable />
    </div>
  );
};
