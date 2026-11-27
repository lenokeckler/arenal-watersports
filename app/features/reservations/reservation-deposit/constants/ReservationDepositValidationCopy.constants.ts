import {
  MONEY_AMOUNT_ISSUE,
  type MoneyAmountIssue,
} from "@/app/constants";

export const RESERVATION_DEPOSIT_VALIDATION_COPY = {
  AMOUNT: {
    [MONEY_AMOUNT_ISSUE.FORMAT]:
      "Escriba un monto válido, solo números. Por ejemplo: 45.50",
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]:
      "El monto debe ser mayor que cero.",
    [MONEY_AMOUNT_ISSUE.PRECISION]:
      "El monto es demasiado grande.",
  } satisfies Record<MoneyAmountIssue, string>,
  AMOUNT_REQUIRED: "Escriba el monto recibido.",
  AMOUNT_TOO_MANY_DECIMALS:
    "Use como máximo dos decimales.",
} as const;
