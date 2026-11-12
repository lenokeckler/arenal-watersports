import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";

export interface ReservationDetailAmountEntry {
  amount: number;
  currency: ReservationDetailCurrency;
}
