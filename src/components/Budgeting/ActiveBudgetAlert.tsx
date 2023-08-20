import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  HStack,
} from "@chakra-ui/react";

export const ActiveBudgetAlert = () => {
  return (
    <Alert
      py={4}
      bg="brand.secondaryBg"
      status="success"
      textAlign="center"
      flexDirection="column"
    >
      <HStack mb={1} spacing="0px">
        <AlertIcon boxSize="30px" color="brand.tertiary" />
        <AlertTitle color="brand.text">Your Budget Plan is Active</AlertTitle>
      </HStack>
      <AlertDescription maxWidth="3xl">
        <strong>Note:</strong> Your budget expenses will reflect any expenses
        added to the expense page, provided they fall within the specified
        budget dates. If you would like to start a new budget plan, please
        remove the existing one.
      </AlertDescription>
    </Alert>
  );
};
