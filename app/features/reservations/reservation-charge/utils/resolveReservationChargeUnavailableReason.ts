import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_CHARGE_UNAVAILABLE_REASON } from "../constants/ReservationChargeUnavailableReason.constants";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeUnavailableReason } from "../models/ReservationChargeUnavailableReason.type";

export const resolveReservationChargeUnavailableReason = ({
  status,
}: Pick<
  ReservationCharge,
  "parentReservationId" | "status"
>): ReservationChargeUnavailableReason =>
  status === RESERVATION_STATUS.CANCELLED
    ? RESERVATION_CHARGE_UNAVAILABLE_REASON.CANCELLED
    : RESERVATION_CHARGE_UNAVAILABLE_REASON.SPLIT_CHILD;
