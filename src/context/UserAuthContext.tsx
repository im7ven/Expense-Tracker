import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface User {
  uid?: string | null;
  displayName: string;
  email?: string | null;
}

interface AuthContextValue {
  user?: User | null;
  signUp: (
    email: string,
    password: string,
    userName: string
  ) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  authStateRestored: boolean;
  googleSignIn: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const UserAuthContext = createContext<AuthContextValue>({} as AuthContextValue);
export const UserAuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [authStateRestored, setAuthStateRestored] = useState(false);
  const navigate = useNavigate();

  const signUp = async (
    userEmail: string,
    userPassword: string,
    userName: string
  ) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    const { user } = userCredentials;

    await updateProfile(user, {
      displayName: userName,
    });

    const { uid, displayName, email } = user;

    await setDoc(doc(db, "users", uid), {
      displayName: displayName,
      email: email || "",
    });

    return userCredentials;
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/useraccount");
    } catch (err) {
      console.log(err);
    }
  };

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
    googleSignIn,
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
