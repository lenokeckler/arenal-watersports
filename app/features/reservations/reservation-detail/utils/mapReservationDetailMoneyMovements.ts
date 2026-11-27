import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { compareReservationDetailMoneyMovements } from "./compareReservationDetailMoneyMovements";
import { mapReservationDetailChargeMovement } from "./mapReservationDetailChargeMovement";
import { mapReservationDetailRefundMovement } from "./mapReservationDetailRefundMovement";

export const mapReservationDetailMoneyMovements = (
  source: ReservationDetailReservationSource,
  workerNames: ReservationDetailWorkerName[]
): ReservationDetailMoneyMovement[] =>
  [
    ...source.reservation_charges.map((charge) =>
      mapReservationDetailChargeMovement(
        charge,
        workerNames
      )
    ),
    ...source.refunds.map((refund) =>
      mapReservationDetailRefundMovement(
        refund,
        workerNames
      )
    ),
  ].sort(compareReservationDetailMoneyMovements);
