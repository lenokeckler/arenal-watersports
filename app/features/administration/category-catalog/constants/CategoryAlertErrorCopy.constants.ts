import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import {
  CATEGORY_ALERT_ISSUE,
  type CategoryAlertIssue,
} from "./CategoryAlertIssue.constants";
import { CATEGORY_ALERT_LIMITS } from "./CategoryAlertLimits.constants";

export const CATEGORY_ALERT_ERROR_COPY: Record<
  keyof CategoryAlertFormErrors,
  Record<CategoryAlertIssue, string>
> = {
  minQuantityText: {
    [CATEGORY_ALERT_ISSUE.REQUIRED]:
      "Ingrese la cantidad mínima a partir de la cual se avisa.",
    [CATEGORY_ALERT_ISSUE.NOT_INTEGER]:
      "La cantidad mínima debe ser un número entero, sin decimales ni letras.",
    [CATEGORY_ALERT_ISSUE.NOT_POSITIVE]:
      "La cantidad mínima debe ser mayor que cero.",
    [CATEGORY_ALERT_ISSUE.TOO_LARGE]: `La cantidad mínima no puede ser mayor que ${CATEGORY_ALERT_LIMITS.MAX}.`,
  },
  expiryDaysText: {
    [CATEGORY_ALERT_ISSUE.REQUIRED]:
      "Ingrese cuántos días antes del vencimiento se avisa.",
    [CATEGORY_ALERT_ISSUE.NOT_INTEGER]:
      "Los días de anticipación deben ser un número entero, sin decimales ni letras.",
    [CATEGORY_ALERT_ISSUE.NOT_POSITIVE]:
      "Los días de anticipación deben ser mayores que cero.",
    [CATEGORY_ALERT_ISSUE.TOO_LARGE]: `Los días de anticipación no pueden ser mayores que ${CATEGORY_ALERT_LIMITS.MAX}.`,
  },
};
