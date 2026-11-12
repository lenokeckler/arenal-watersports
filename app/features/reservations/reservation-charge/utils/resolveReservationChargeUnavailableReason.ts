import { RESERVATION_STATUS } from "@/app/constants";
import { isReservationChargeable } from "@/app/utils/reservations/isReservationChargeable";
import { RESERVATION_CHARGE_UNAVAILABLE_REASON } from "../constants/ReservationChargeUnavailableReason.constants";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeUnavailableReason } from "../models/ReservationChargeUnavailableReason.type";

export const resolveReservationChargeUnavailableReason = ({
  parentReservationId,
  status,
}: Pick<
  ReservationCharge,
  "parentReservationId" | "status"
>): ReservationChargeUnavailableReason | null => {
  if (
    isReservationChargeable({ parentReservationId, status })
  ) {
    return null;
  }

  return parentReservationId !== null &&
    status !== RESERVATION_STATUS.CANCELLED
    ? RESERVATION_CHARGE_UNAVAILABLE_REASON.SPLIT_CHILD
    : RESERVATION_CHARGE_UNAVAILABLE_REASON.CANCELLED;
};
