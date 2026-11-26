import { RESERVATION_DETAIL_MOVEMENT_TYPE } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_MOVEMENT_KIND_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import type { ReservationDetailChargeSource } from "../models/ReservationDetailChargeSource.interface";
import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { getReservationDetailWorkerName } from "./getReservationDetailWorkerName";

export const mapReservationDetailChargeMovement = (
  charge: ReservationDetailChargeSource,
  workerNames: ReservationDetailWorkerName[]
): ReservationDetailMoneyMovement => ({
  amount: charge.amount,
  concept:
    RESERVATION_DETAIL_MOVEMENT_KIND_COPY[charge.kind],
  createdAt: charge.created_at,
  currency: charge.currency,
  id: charge.id,
  paymentMethod: charge.payment_method,
  recordedByName: getReservationDetailWorkerName(
    workerNames,
    charge.created_by
  ),
  type: RESERVATION_DETAIL_MOVEMENT_TYPE.CHARGE,
});
