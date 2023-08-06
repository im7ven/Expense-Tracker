import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

interface Props {
  isLogin: boolean;
}

export const Auth = ({ isLogin }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useUserAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/useraccount");
        console.log("this is test2", auth.currentUser);
      } else {
        await signUp(email, password, name);
        console.log(auth.currentUser);
        navigate("/useraccount");
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setError(err.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={4}
    >
      <Container bg="brand.secondaryBg" borderRadius={10} px={0} pt={8}>
        <Badge
          className="greeting-badge"
          bg="brand.primary"
          py={5}
          px={5}
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
              mb={4}
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
              <Button width="100%" type="submit">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Center>
            {isLogin ? (
              <Text mt={5} textAlign="center">
                Need an account?<Link to={"/signup"}> Sign Up</Link>
              </Text>
            ) : (
              <Text mt={5} textAlign="center">
                Already have an account? <Link to={"/login"}>Login</Link>
              </Text>
            )}
            <Center>{error !== "" && <Text color="red">{error}</Text>}</Center>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};
