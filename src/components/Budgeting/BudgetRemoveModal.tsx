import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useBudget } from "../../context/UserBudgetContext";

export const BudgetRemoveModal = () => {
  const { handleRemoveExpense, budget } = useBudget();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const onBudgetDelete = () => {
    if (budget) {
      handleRemoveExpense(budget?.[0]?.id);
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Discard</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg="#232323">
          <AlertDialogHeader>Remove Budget?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you would like to remove your current budget plan.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button bg="brand.secondary" ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="red.500" ml={3} onClick={() => onBudgetDelete()}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
