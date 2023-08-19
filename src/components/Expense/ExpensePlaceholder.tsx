import { Box, Heading } from "@chakra-ui/react";

interface Props {
  children: string;
}

export const ExpensePlaceholder = ({ children }: Props) => {
  return (
    <Box padding={3} border="1px solid white" borderRadius={15} minH="400px">
      <Heading size="md" color="brand.secondary">
        {children}
      </Heading>
    </Box>
  );
};
