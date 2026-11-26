import { RESERVATION_DETAIL_MOVEMENT_TYPE } from "../constants/ReservationDetail.constants";
import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";
import type { ReservationDetailRefundSource } from "../models/ReservationDetailRefundSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { getReservationDetailWorkerName } from "./getReservationDetailWorkerName";

export const mapReservationDetailRefundMovement = (
  refund: ReservationDetailRefundSource,
  workerNames: ReservationDetailWorkerName[]
): ReservationDetailMoneyMovement => ({
  amount: refund.amount,
  concept: refund.reason,
  createdAt: refund.created_at,
  currency: refund.currency,
  id: refund.id,
  paymentMethod: null,
  recordedByName: getReservationDetailWorkerName(
    workerNames,
    refund.created_by
  ),
  type: RESERVATION_DETAIL_MOVEMENT_TYPE.REFUND,
});
