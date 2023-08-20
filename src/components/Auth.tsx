import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { FormEvent, useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import primaryBackground from "../images/FormBg.webp";

interface Props {
  isLogin: boolean;
}

export const Auth = ({ isLogin }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, googleSignIn } = useUserAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/useraccount");
      } else {
        await signUp(email, password, name);
        navigate("/useraccount");
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setError(err.message);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn();
  };

  console.log("Current");
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={4}
    >
      <SimpleGrid
        borderRadius={10}
        overflow="hidden"
        bg="brand.secondaryBg"
        width="100%"
        maxWidth="3xl"
        spacing={5}
        columns={{ base: 1, md: 2 }}
      >
        <Flex
          height={{ base: "200px", md: "initial" }}
          bgPosition="center"
          justify={{ base: "center", md: "start" }}
          bgSize="cover"
          bgImage={primaryBackground}
        >
          <Flex
            alignSelf="center"
            justify="center"
            flexDirection={{ base: "column", md: "column" }}
          >
            <Heading>Money</Heading>
            <Heading>Management</Heading>
            <Heading>Made</Heading>
            <Heading>Easier</Heading>
          </Flex>
        </Flex>
        <Container borderRadius={10} px={0} pt={8}>
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
                  Need an account?
                  <Link className="highlight-link" to={"/signup"}>
                    {" "}
                    Sign Up
                  </Link>
                </Text>
              ) : (
                <Text mt={5} textAlign="center">
                  Already have an account?
                  <Text>
                    <Link className="highlight-link" to={"/login"}>
                      Login
                    </Link>
                  </Text>
                </Text>
              )}

              <Divider my={3} />
              <Center>
                <GoogleButton onClick={handleGoogleSignIn} />
              </Center>
              <Center>
                {error !== "" && <Text color="red">{error}</Text>}
              </Center>
            </FormControl>
          </form>
        </Container>
      </SimpleGrid>
    </Box>
  );
};
