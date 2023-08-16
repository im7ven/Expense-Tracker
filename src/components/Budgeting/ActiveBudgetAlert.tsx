import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

interface Props {
  onClose: () => void;
}

export const ActiveBudgetAlert = ({ onClose }: Props) => {
  return (
    <Alert
      pb={5}
      bg="brand.secondaryBg"
      status="success"
      textAlign="center"
      flexDirection="column"
    >
      <CloseButton
        size={{ base: "md", md: "lg" }}
        alignSelf="end"
        onClick={() => onClose()}
      />
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
