import { MOVEMENT_REPORT_FORMAT } from "../constants/MovementReport.constants";

export const formatMovementAmount = (
  currency: string,
  amount: number
): string =>
  new Intl.NumberFormat(MOVEMENT_REPORT_FORMAT.locale, {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
