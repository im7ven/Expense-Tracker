import { Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

interface Expense {
  id: string;
  expenseName: string;
  category: string;
  amount: string;
  date: string;
}

export const ExpenseList = () => {
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

  if (dataReceived !== true) {
    return <Spinner size="xl"></Spinner>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Expense</Th>
          <Th>Category</Th>
          <Th>Amount</Th>
          <Th>Date Added</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses?.map((expense) => (
          <Tr key={expense.id}>
            <Td>{expense.expenseName}</Td>
            <Td>{expense.category}</Td>
            <Td>{expense.amount}</Td>
            <Td>{expense.date}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
