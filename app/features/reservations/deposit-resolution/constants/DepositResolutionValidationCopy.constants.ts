import {
  MONEY_AMOUNT_ISSUE,
  type MoneyAmountIssue,
} from "@/app/constants";
import { DEPOSIT_RESOLUTION_LIMITS } from "./DepositResolutionLimits.constants";

export const DEPOSIT_RESOLUTION_VALIDATION_COPY = {
  REASON_DISALLOWED_CHARACTERS:
    "El motivo tiene caracteres no permitidos.",
  REASON_REQUIRED:
    "Escriba el motivo del daño: no se devuelve todo el depósito.",
  REASON_TOO_LONG: `Use como máximo ${DEPOSIT_RESOLUTION_LIMITS.REASON_MAX_LENGTH} caracteres.`,
  RETURNED: {
    [MONEY_AMOUNT_ISSUE.FORMAT]:
      "Escriba un monto válido, solo números. Por ejemplo: 100.00",
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]:
      "Escriba un monto válido, solo números. Por ejemplo: 100.00",
    [MONEY_AMOUNT_ISSUE.PRECISION]:
      "El monto es demasiado grande.",
  } satisfies Record<MoneyAmountIssue, string>,
  RETURNED_ABOVE_DEPOSIT: (deposit: string): string =>
    `No puede devolver más que el depósito: ${deposit}.`,
  RETURNED_ABOVE_DEPOSIT_REFUSED:
    "No puede devolver más que el depósito.",
  RETURNED_REQUIRED:
    "Escriba cuánto se le devuelve al cliente. Si no se le devuelve nada, escriba 0.",
  RETURNED_TOO_MANY_DECIMALS:
    "Use como máximo dos decimales.",
} as const;
