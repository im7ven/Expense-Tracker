import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";

// const config: ThemeConfig = {
//   initialColorMode: "dark",
// };

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#16161a",
        color: "#fffffe",
      },
      p: {
        color: "#94a1b2",
      },
    },
  },

  colors: {
    brand: {
      bg: "#16161a",
      secondaryBg: "#242629",
      primary: "#7f5af0",
      secondary: "#72757e",
      tertiary: "#2cb67d",
    },
  },
  components: {
    Button,
  },
});

export default theme;