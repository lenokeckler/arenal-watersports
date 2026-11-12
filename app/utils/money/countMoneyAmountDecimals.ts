import {
  MONEY_AMOUNT_DECIMAL_SEPARATOR,
  STRING,
} from "@/app/constants";
import { normalizeMoneyAmountText } from "./normalizeMoneyAmountText";

export const countMoneyAmountDecimals = (
  amountText: string
): number => {
  const [, decimalDigits = STRING.Empty] =
    normalizeMoneyAmountText(amountText).split(
      MONEY_AMOUNT_DECIMAL_SEPARATOR
    );
  return decimalDigits.length;
};
