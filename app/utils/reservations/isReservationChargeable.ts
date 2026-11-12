import { RESERVATION_CHARGEABLE_STATUS } from "@/app/constants";
import type { ReservationChargeEligibility } from "./models/ReservationChargeEligibility.interface";

export const isReservationChargeable = ({
  parentReservationId,
  status,
}: ReservationChargeEligibility): boolean =>
  parentReservationId === null &&
  Object.values<string>(
    RESERVATION_CHARGEABLE_STATUS
  ).includes(status);
