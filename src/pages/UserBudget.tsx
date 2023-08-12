import { BudgetTable } from "../components/Budgeting/BudgetTable";
import { ExpenseBudgetForm } from "../components/Budgeting/ExpenseBudgetForm";

export const UserBudget = () => {
  return (
    <div>
      <ExpenseBudgetForm />
      <BudgetTable />
    </div>
  );
};
