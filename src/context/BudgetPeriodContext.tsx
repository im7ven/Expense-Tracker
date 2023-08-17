import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Expense, useExpense } from "./ExpenseContext";
import { useBudget } from "./UserBudgetContext";
import { differenceInMilliseconds } from "date-fns";

interface Props {
  children: ReactNode;
}

interface BudgetPeriodContextValue {
  budgetDateProgress: number;
  budgetExpenses?: Expense[];
  budgetExpenseTotal?: number;
}

const BudgetPeriodContext = createContext<BudgetPeriodContextValue>(
  {} as BudgetPeriodContextValue
);

export const BudgetPeriodProvider = ({ children }: Props) => {
  const { budget } = useBudget();
  const { expenses } = useExpense();
  const [budgetDateProgress, setBudgetDateProgress] = useState(0);
  const [budgetExpenses, setBudgetExpenses] = useState<Expense[]>();
  const [budgetExpenseTotal, setBudgetExpenseTotal] = useState<
    number | undefined
  >(0);

  useEffect(() => {
    const budgetStartDate = budget?.[0]?.startDate;
    const budgetEndDate = budget?.[0]?.endDate;
    const budgetAmount = budget?.[0]?.amount;

    let dateProgress = 0;

    if (budget && budgetStartDate && budgetEndDate) {
      const startDateParts = budgetStartDate.split("-");
      const endDateParts = budgetEndDate.split("-");

      const startDate = new Date(
        parseInt(startDateParts[0]),
        parseInt(startDateParts[1]) - 1,
        parseInt(startDateParts[2])
      );

      const endDate = new Date(
        parseInt(endDateParts[0]),
        parseInt(endDateParts[1]) - 1,
        parseInt(endDateParts[2])
      );

      const currentDate = new Date();
      const totalMillis = differenceInMilliseconds(endDate, startDate);
      const elapsedMillis = differenceInMilliseconds(currentDate, startDate);

      dateProgress = (elapsedMillis / totalMillis) * 100;
      dateProgress = Math.min(dateProgress, 100);
      setBudgetDateProgress(dateProgress);
    }

    const newBudgetExpenses = expenses?.filter((expense) => {
      return (
        budgetStartDate &&
        budgetEndDate &&
        expense.date >= budgetStartDate &&
        expense.date <= budgetEndDate
      );
    });
    setBudgetExpenses(newBudgetExpenses);

    const newBudgetExpenseTotal = newBudgetExpenses?.reduce((acc, expense) => {
      return (acc += parseInt(expense.amount));
    }, 0);
    setBudgetExpenseTotal(newBudgetExpenseTotal);
  }, [budget, expenses]);

  const budgetPeriodContextValue: BudgetPeriodContextValue = {
    budgetDateProgress,
    budgetExpenses,
    budgetExpenseTotal,
  };
  return (
    <BudgetPeriodContext.Provider value={budgetPeriodContextValue}>
      {children}
    </BudgetPeriodContext.Provider>
  );
};

export const useBudgetProgress = () => {
  return useContext(BudgetPeriodContext);
};
