import {
  MONEY_AMOUNT_COMMA_SEPARATOR,
  MONEY_AMOUNT_DECIMAL_SEPARATOR,
} from "@/app/constants";

export const normalizeMoneyAmountText = (
  amountText: string
): string =>
  amountText.replace(
    MONEY_AMOUNT_COMMA_SEPARATOR,
    MONEY_AMOUNT_DECIMAL_SEPARATOR
  );
