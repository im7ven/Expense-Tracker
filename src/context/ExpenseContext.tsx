import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../config/firebase";
import { useUserAuth } from "./UserAuthContext";

interface Props {
  children: ReactNode;
}

interface Expense {
  id: string;
  expenseName: string;
  category: string;
  amount: string;
  date: string;
}

interface ExpenseContextValue {
  expenses?: Expense[];
  handleDeleteExpense: (expenseId: string) => Promise<void>;
  dataReceived: boolean;
  addExpense: (
    expenseName: string,
    category: string,
    amount: string,
    date: string
  ) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextValue>(
  {} as ExpenseContextValue
);
export const ExpenseContextProvider = ({ children }: Props) => {
  const addExpense = async (
    expenseName: string,
    category: string,
    amount: string,
    date: string
  ) => {
    try {
      if (user?.uid) {
        const userExpenseRef = collection(db, "users", user?.uid, "expenses");
        await addDoc(userExpenseRef, { expenseName, category, amount, date });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [expenses, setExpenses] = useState<Expense[]>();
  const [dataReceived, setDataReceived] = useState(false);
  const { user } = useUserAuth();
  useEffect(() => {
    if (user?.uid) {
      const userExpenseRef = collection(db, "users", user?.uid, "expenses");

      const unsubscribe = onSnapshot(userExpenseRef, (querySnapshot) => {
        setDataReceived(true);
        const expenseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expense[];
        setExpenses(expenseData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      if (user?.uid) {
        const expenseRef = doc(db, "users", user?.uid, "expenses", expenseId);
        await deleteDoc(expenseRef);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const expenseContextValue: ExpenseContextValue = {
    handleDeleteExpense,
    expenses,
    dataReceived,
    addExpense,
  };

  return (
    <ExpenseContext.Provider value={expenseContextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  return useContext(ExpenseContext);
};
