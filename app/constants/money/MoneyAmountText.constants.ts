export const MONEY_AMOUNT_DECIMAL_SEPARATOR = ".";

export const MONEY_AMOUNT_PATTERN = new RegExp(
  `^\\d+(\\${MONEY_AMOUNT_DECIMAL_SEPARATOR}\\d+)?$`
);

export const MONEY_AMOUNT_LEADING_ZEROS_PATTERN = /^0+/;
