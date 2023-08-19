export interface SuggestionMsg {
  message: string;
  status: "info" | "warning" | "success" | "error";
  iconColor: string;
}

export const suggestionMsgs: SuggestionMsg[] = [
  {
    message:
      "Your current spending rate is slightly higher then expected, given your budget time frame. To ensure you stay within your budget, consider making some small adjustments to your spending habits.",
    status: "warning",
    iconColor: "yellow.500",
  },
  {
    message:
      " Your current spending rate is significantly outpacing the elapsed time within your budget period. Consider prioritizing essential expenses, to ensure you stay within your budget goals. ",
    status: "warning",
    iconColor: "red.500",
  },
  {
    message: "You have exceed your budget limit.",
    status: "error",
    iconColor: "red.500",
  },
];
