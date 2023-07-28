import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../config/firebase";

interface User {
  uid?: string | null;
  displayName: string;
  email?: string | null;
}

interface AuthContextValue {
  user?: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  authStateRestored: boolean;
}

interface Props {
  children: ReactNode;
}

const UserAuthContext = createContext<AuthContextValue>({} as AuthContextValue);
export const UserAuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [authStateRestored, setAuthStateRestored] = useState(false);

  // Sign up function
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Find the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({
        uid: currentUser?.uid,
        displayName: currentUser?.displayName || "",
        email: currentUser?.email,
      });
      setAuthStateRestored(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOutUser = () => {
    return signOut(auth);
  };

  const authContextValue: AuthContextValue = {
    user,
    signUp,
    signIn,
    signOut: signOutUser,
    authStateRestored,
  };

  return (
    <UserAuthContext.Provider value={authContextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
