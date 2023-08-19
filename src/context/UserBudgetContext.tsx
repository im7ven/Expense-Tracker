import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

interface Props {
  children: ReactNode;
}

interface Budget {
  id: string;
  startDate: string;
  endDate: string;
  amount: string;
}

interface UserBudgetValue {
  addBudget: (startDate: string, endDate: string, amount: string) => void;
  budget?: Budget[];
  handleRemoveBudget: (budgetId: string) => Promise<void>;
}

const UserBudgetContext = createContext<UserBudgetValue>({} as UserBudgetValue);

export const UserBudgetProvider = ({ children }: Props) => {
  const [budget, setBudget] = useState<Budget[]>();
  const { user } = useUserAuth();

  const addBudget = async (
    startDate: string,
    endDate: string,
    amount: string
  ) => {
    try {
      if (user?.uid) {
        const userBudgetRef = collection(db, "users", user?.uid, "budget");
        await addDoc(userBudgetRef, { startDate, endDate, amount });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      const userBudgetRef = collection(db, "users", user?.uid, "budget");

      const unsubscribe = onSnapshot(userBudgetRef, (querySnapShot) => {
        const budgetData = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Budget[];
        setBudget(budgetData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleRemoveBudget = async (budgetId: string) => {
    try {
      if (user?.uid) {
        const budgetRef = doc(db, "users", user?.uid, "budget", budgetId);
        await deleteDoc(budgetRef);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userBudgetValue: UserBudgetValue = {
    addBudget,
    budget,
    handleRemoveBudget,
  };

  return (
    <UserBudgetContext.Provider value={userBudgetValue}>
      {children}
    </UserBudgetContext.Provider>
  );
};

export const useBudget = () => {
  return useContext(UserBudgetContext);
};
