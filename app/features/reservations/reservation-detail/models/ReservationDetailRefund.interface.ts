import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";

export interface ReservationDetailRefund {
  amount: number;
  currency: ReservationDetailCurrency;
}
