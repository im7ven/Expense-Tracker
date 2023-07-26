import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

interface Props {
  isLogin: boolean;
}

export const Auth = ({ isLogin }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let userCredential: UserCredential | null = null;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigate("/useraccount");
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/login");
      }

      if (!isLogin && userCredential !== null) {
        await updateName(name);
      }
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const updateName = async (name: string) => {
    try {
      if (auth.currentUser !== null)
        await updateProfile(auth.currentUser, { displayName: name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container px={0} pt={8} bg="#232323">
        <Badge
          className="greeting-badge"
          py={5}
          px={9}
          borderRadius={{ tl: 0, tr: "lg", bl: 0, br: "lg" }}
        >
          {isLogin ? "Welcome Back" : "Create an account to get started"}
        </Badge>
        <form onSubmit={handleLogin}>
          <FormControl padding={7}>
            {!isLogin && (
              <>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  mb={6}
                  variant="outline"
                  type="name"
                  id="name"
                  placeholder="Enter your name"
                />
              </>
            )}
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              mb={6}
              variant="outline"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              variant="outline"
              type="password"
              id="password"
              placeholder="Enter your email"
            />
            <Center mt={5}>
              <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
            </Center>
            {isLogin ? (
              <Link to={"/signup"}>Need an account? Sign Up</Link>
            ) : (
              <Link to={"/login"}>Already have an account? Login</Link>
            )}
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};
