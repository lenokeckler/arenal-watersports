import type { CurrencyCode } from "@/app/constants";

export interface ReservationRefundCommand {
  amount: number;
  currency: CurrencyCode;
  reason: string;
  reservationId: string;
}
