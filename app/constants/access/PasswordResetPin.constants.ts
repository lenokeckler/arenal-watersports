const PIN_LENGTH = 6;

export const PASSWORD_RESET_PIN = {
  LENGTH: PIN_LENGTH,
  PAD_CHARACTER: "0",
  PATTERN: new RegExp(`^[0-9]{${PIN_LENGTH}}$`),
  RADIX: 10,
  WHITESPACE: /\s/g,
} as const;
