import {
  MONEY_AMOUNT_ISSUE,
  type MoneyAmountIssue,
} from "@/app/constants";
import { RESERVATION_CHARGE_LIMITS } from "./ReservationChargeLimits.constants";

export const RESERVATION_CHARGE_VALIDATION_COPY = {
  AMOUNT: {
    [MONEY_AMOUNT_ISSUE.FORMAT]:
      "Escriba un monto válido, solo números. Por ejemplo: 45.50",
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]:
      "El monto debe ser mayor que cero.",
    [MONEY_AMOUNT_ISSUE.PRECISION]:
      "El monto es demasiado grande.",
  } satisfies Record<MoneyAmountIssue, string>,
  AMOUNT_REQUIRED: "Escriba el monto cobrado.",
  AMOUNT_TOO_MANY_DECIMALS:
    "Use como máximo dos decimales.",
  CHOICE_REQUIRED: "Elija cómo pagó el cliente.",
  METHOD_DISALLOWED_CHARACTERS:
    "El método de pago tiene caracteres no permitidos.",
  METHOD_TOO_LONG: `Use como máximo ${RESERVATION_CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH} caracteres.`,
  OTHER_REQUIRED: "Escriba cuál fue el método de pago.",
} as const;
