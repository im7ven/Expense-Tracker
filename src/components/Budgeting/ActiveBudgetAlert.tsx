import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";

export const ActiveBudgetAlert = () => {
  return (
    <Alert
      bg="brand.secondaryBg"
      status="success"
      textAlign="center"
      flexDirection="column"
    >
      <AlertIcon boxSize="30px" color="brand.tertiary" />
      <AlertTitle color="brand.text">Your Budget Plan is Active</AlertTitle>
      <AlertDescription maxWidth="3xl">
        Any expenses added to the expense page will be included in your budget
        expenses, provided they fall within the specified budget dates. If you
        would like to start a new budget plan, please remove the existing one.
      </AlertDescription>
    </Alert>
  );
};
