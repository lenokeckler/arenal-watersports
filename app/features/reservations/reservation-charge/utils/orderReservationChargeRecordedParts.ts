import { RESERVATION_CHARGE_CURRENCY_ORDER } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeRecordedPart } from "../models/ReservationChargeRecordedPart.interface";

export const orderReservationChargeRecordedParts = (
  parts: readonly ReservationChargeRecordedPart[]
): ReservationChargeRecordedPart[] =>
  RESERVATION_CHARGE_CURRENCY_ORDER.flatMap((currency) =>
    parts.filter((part) => part.currency === currency)
  );
