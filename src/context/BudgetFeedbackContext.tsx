import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SuggestionMsg,
  suggestionMsgs,
} from "../components/Budgeting/BudgetFeedbackData";
import { useBudgetProgress } from "./BudgetPeriodContext";
import { useBudget } from "./UserBudgetContext";

interface Props {
  children: ReactNode;
}

interface BudgetFeedbackContextValue {
  suggestionMsg?: SuggestionMsg;
  progressColor: string;
}

const BudgetFeedbackContext = createContext<BudgetFeedbackContextValue>(
  {} as BudgetFeedbackContextValue
);

export const BudgetFeedbackProvider = ({ children }: Props) => {
  const { budgetDateProgress } = useBudgetProgress();
  const { budgetExpenseTotal, expenseProgress } = useBudgetProgress();
  const { budget } = useBudget();
  const [progressColor, setProgressColor] = useState<string>("");
  const [suggestionMsg, setSuggestionMsg] = useState<SuggestionMsg>();

  const budgetAmount = budget?.[0]?.amount;

  useEffect(() => {
    if (budgetAmount && budgetExpenseTotal && expenseProgress) {
      if (budgetExpenseTotal > parseInt(budgetAmount)) {
        setProgressColor("red.500");
      } else {
        const difference = expenseProgress - budgetDateProgress;

        if (difference > 15) {
          setProgressColor("red.500");
          setSuggestionMsg(suggestionMsgs[0]);
        } else if (difference > 5) {
          setProgressColor("yellow.500");
          setSuggestionMsg(suggestionMsgs[1]);
        } else {
          setProgressColor("brand.tertiary");
        }
      }
    }
  }, [budgetAmount, budgetExpenseTotal, expenseProgress, budgetDateProgress]);

  const budgetFeedbackContextValue: BudgetFeedbackContextValue = {
    suggestionMsg,
    progressColor,
  };

  return (
    <BudgetFeedbackContext.Provider value={budgetFeedbackContextValue}>
      {children}
    </BudgetFeedbackContext.Provider>
  );
};

export const useBudgetFeedback = () => {
  return useContext(BudgetFeedbackContext);
};
