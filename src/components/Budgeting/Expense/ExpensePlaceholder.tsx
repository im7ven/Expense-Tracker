import { Box, Heading } from "@chakra-ui/react";

export const ExpensePlaceholder = () => {
  return (
    <Box padding={3} border="1px solid white" borderRadius={15} minH="400px">
      <Heading size="md" color="brand.secondary">
        You have no current expenses...
      </Heading>
    </Box>
  );
};
