import { RESERVATION_DETAIL_MOVEMENT_TYPE } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_MOVEMENT_KIND_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import type { ReservationDetailChargeSource } from "../models/ReservationDetailChargeSource.interface";
import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";
import type { ReservationDetailRefundSource } from "../models/ReservationDetailRefundSource.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { compareReservationDetailMoneyMovements } from "./compareReservationDetailMoneyMovements";
import { getReservationDetailWorkerName } from "./getReservationDetailWorkerName";

const mapChargeMovement = (
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

const mapRefundMovement = (
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

export const mapReservationDetailMoneyMovements = (
  source: ReservationDetailReservationSource,
  workerNames: ReservationDetailWorkerName[]
): ReservationDetailMoneyMovement[] =>
  [
    ...source.reservation_charges.map((charge) =>
      mapChargeMovement(charge, workerNames)
    ),
    ...source.refunds.map((refund) =>
      mapRefundMovement(refund, workerNames)
    ),
  ].sort(compareReservationDetailMoneyMovements);
