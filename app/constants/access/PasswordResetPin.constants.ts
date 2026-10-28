const PIN_LENGTH = 6;

export const PASSWORD_RESET_PIN = {
  LENGTH: PIN_LENGTH,
  PATTERN: new RegExp(`^[0-9]{${PIN_LENGTH}}$`),
  WHITESPACE: /\s/g,
} as const;
