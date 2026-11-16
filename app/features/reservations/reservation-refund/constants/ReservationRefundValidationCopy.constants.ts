import {
  MONEY_AMOUNT_ISSUE,
  type MoneyAmountIssue,
} from "@/app/constants";
import { RESERVATION_REFUND_LIMITS } from "./ReservationRefundLimits.constants";

export const RESERVATION_REFUND_VALIDATION_COPY = {
  AMOUNT: {
    [MONEY_AMOUNT_ISSUE.FORMAT]:
      "Escriba un monto válido, solo números. Por ejemplo: 45.50",
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]:
      "El monto debe ser mayor que cero.",
    [MONEY_AMOUNT_ISSUE.PRECISION]:
      "El monto es demasiado grande.",
  } satisfies Record<MoneyAmountIssue, string>,
  AMOUNT_ABOVE_AVAILABLE:
    "El monto supera lo disponible para devolver en esta moneda.",
  AMOUNT_REQUIRED: "Escriba el monto devuelto.",
  AMOUNT_TOO_MANY_DECIMALS:
    "Use como máximo dos decimales.",
  CURRENCY_INVALID: "Elija la moneda de la devolución.",
  OTHER_REQUIRED: "Escriba el motivo de la devolución.",
  REASON_DISALLOWED_CHARACTERS:
    "El motivo tiene caracteres no permitidos.",
  REASON_REQUIRED: "Elija el motivo de la devolución.",
  REASON_TOO_LONG: `Use como máximo ${RESERVATION_REFUND_LIMITS.REASON_MAX_LENGTH} caracteres.`,
} as const;
