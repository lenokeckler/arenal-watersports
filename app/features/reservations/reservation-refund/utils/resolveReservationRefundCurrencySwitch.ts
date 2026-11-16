import type { CurrencyCode } from "@/app/constants";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";

export const resolveReservationRefundCurrencySwitch = (
  values: ReservationRefundValues,
  currency: CurrencyCode
): ReservationRefundValues => ({ ...values, currency });
