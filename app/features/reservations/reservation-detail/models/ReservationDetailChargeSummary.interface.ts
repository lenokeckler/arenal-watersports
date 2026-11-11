import type { ReservationDetailChargeStatus } from "../constants/ReservationDetail.constants";
import type { ReservationDetailCharge } from "./ReservationDetailCharge.interface";
import type { ReservationDetailExtraTimeCharge } from "./ReservationDetailExtraTimeCharge.interface";
import type { ReservationDetailRefund } from "./ReservationDetailRefund.interface";

export interface ReservationDetailChargeSummary {
  charges: ReservationDetailCharge[];
  extraTimeCharges: ReservationDetailExtraTimeCharge[];
  refunds: ReservationDetailRefund[];
  status: ReservationDetailChargeStatus;
}
