import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
  type MoneyAmountIssue,
} from "@/app/constants";
import { CATEGORY_DEPOSIT_LIMITS } from "./CategoryDepositLimits.constants";

const FORMAT_ERROR =
  "Escriba solo números, con punto para los decimales y sin separador de miles.";
const NOT_POSITIVE_ERROR =
  "Ingrese un monto mayor que cero o deje el campo vacío.";

const buildPrecisionError = (
  currency: CurrencyCode
): string => {
  const { decimalPlaces, maxIntegerDigits } =
    CATEGORY_DEPOSIT_LIMITS[currency];
  return `Use hasta ${maxIntegerDigits} dígitos enteros y ${decimalPlaces} decimales.`;
};

export const CATEGORY_DEPOSIT_ERROR_COPY: Record<
  CurrencyCode,
  Record<MoneyAmountIssue, string>
> = {
  [CURRENCY_CODE.CRC]: {
    [MONEY_AMOUNT_ISSUE.FORMAT]: FORMAT_ERROR,
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]: NOT_POSITIVE_ERROR,
    [MONEY_AMOUNT_ISSUE.PRECISION]: buildPrecisionError(
      CURRENCY_CODE.CRC
    ),
  },
  [CURRENCY_CODE.USD]: {
    [MONEY_AMOUNT_ISSUE.FORMAT]: FORMAT_ERROR,
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]: NOT_POSITIVE_ERROR,
    [MONEY_AMOUNT_ISSUE.PRECISION]: buildPrecisionError(
      CURRENCY_CODE.USD
    ),
  },
};
