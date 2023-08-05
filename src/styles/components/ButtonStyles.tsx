import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "#7f5af0",
    },
    secondary: {
      bg: "#72757e",
    },
    tertiary: {
      bg: "#2cb67d",
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: { variant: "primary" },
};
