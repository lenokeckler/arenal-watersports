export const PASSWORD_LENGTH = {
  MAX: 72,
  MIN: 8,
} as const;

export const PASSWORD_RULE_ID = {
  DIGIT: "digit",
  LOWERCASE: "lowercase",
  MAX_LENGTH: "maxLength",
  MIN_LENGTH: "minLength",
  SYMBOL: "symbol",
  UPPERCASE: "uppercase",
} as const;

export type PasswordRuleId =
  (typeof PASSWORD_RULE_ID)[keyof typeof PASSWORD_RULE_ID];

export const PASSWORD_RULE_ORDER = [
  PASSWORD_RULE_ID.UPPERCASE,
  PASSWORD_RULE_ID.LOWERCASE,
  PASSWORD_RULE_ID.DIGIT,
  PASSWORD_RULE_ID.SYMBOL,
  PASSWORD_RULE_ID.MIN_LENGTH,
  PASSWORD_RULE_ID.MAX_LENGTH,
] as const;

export const PASSWORD_RULE_PATTERN = {
  DIGIT: /\d/,
  LOWERCASE: /\p{Ll}/u,
  SYMBOL: /[^\p{L}\p{N}\s]/u,
  UPPERCASE: /\p{Lu}/u,
} as const;
