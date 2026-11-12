import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";

export interface ReservationDetailExtraTimeCharge {
  amountCharged: number;
  currency: ReservationDetailCurrency;
}
