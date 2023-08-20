import {
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useBudgetProgress } from "../../context/BudgetPeriodContext";
import { useBudget } from "../../context/UserBudgetContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetEndModal = ({ isOpen, onClose }: Props) => {
  const { budgetExpenseTotal } = useBudgetProgress();
  const { budget } = useBudget();

  const startDate = budget?.[0]?.startDate;
  const endDate = budget?.[0]?.endDate;
  const amount = budget?.[0]?.amount;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="brand.secondaryBg">
        <ModalHeader>Budget Plan has Ended</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading mb={3} size="sm">
            Summary:
          </Heading>
          <Stat mb={3} textAlign="center">
            <StatLabel>Budget Amount</StatLabel>
            <StatNumber>${amount && parseInt(amount).toFixed(0)}</StatNumber>
            <StatHelpText>
              {startDate} - {endDate}
            </StatHelpText>
          </Stat>
          <Stat textAlign="center">
            <StatLabel>Expense Total</StatLabel>
            <StatNumber>${budgetExpenseTotal?.toFixed(2)}</StatNumber>
          </Stat>

          <HStack></HStack>
        </ModalBody>
        <ModalFooter>
          <Button bg="brand.tertiary" width="100%" onClick={onClose}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
