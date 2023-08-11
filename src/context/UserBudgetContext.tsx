import { ReactNode, createContext, useContext } from "react";
import { useUserAuth } from "./UserAuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

interface Props {
  children: ReactNode;
}

interface UserBudgetValue {
  addBudget: (startDate: string, endDate: string, amount: string) => void;
  // cancelBudget: () => void;
}

const UserBudgetContext = createContext<UserBudgetValue>({} as UserBudgetValue);

export const UserBudgetProvider = ({ children }: Props) => {
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

  const userBudgetValue: UserBudgetValue = {
    addBudget,
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
