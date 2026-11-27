export const PAYMENT_METHOD_TEXT = {
  DISALLOWED_CHARACTER: /[\p{Cc}\p{Cf}]/u,
  EDGE_WHITESPACE: /^\s+|\s+$/g,
  INNER_WHITESPACE: /\s+/g,
  LOCALE: "es",
  NORMALIZATION_FORM: "NFC",
  SINGLE_SPACE: " ",
} as const;
