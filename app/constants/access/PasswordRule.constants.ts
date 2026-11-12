export const PASSWORD_RULE = {
  LENGTH: "length",
  UPPERCASE: "uppercase",
  LOWERCASE: "lowercase",
  DIGIT: "digit",
  SYMBOL: "symbol",
} as const;

export type PasswordRule =
  (typeof PASSWORD_RULE)[keyof typeof PASSWORD_RULE];
