export interface SuggestionMsg {
  message: string;
  type: string;
}

export const suggestionMsgs: SuggestionMsg[] = [
  {
    message:
      "Your current spending rate is slightly higher then expected, given your budget time frame. To ensure you stay within your budget, consider making some small adjustments to your spending habits.",
    type: "warning",
  },
  {
    message:
      " Your current spending rate is significantly outpacing the elapsed time within your budget period. Consider prioritizing essential expenses, to ensure you stay within your budget goals. ",
    type: "warning",
  },
];
