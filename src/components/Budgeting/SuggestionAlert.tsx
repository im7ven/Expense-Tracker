import {
  Alert,
  AlertDescription,
  AlertIcon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useBudgetFeedback } from "../../context/BudgetFeedbackContext";

export const SuggestionAlert = () => {
  const { suggestionMsg } = useBudgetFeedback();

  return (
    <Alert bg="#CECECE" status={suggestionMsg?.status}>
      <AlertIcon color={suggestionMsg?.iconColor} />
      <AlertDescription color="#000">
        <HStack>
          <Text fontWeight="bold">Warning:</Text>
          <Text>{suggestionMsg?.message}</Text>
        </HStack>
      </AlertDescription>
    </Alert>
  );
};
