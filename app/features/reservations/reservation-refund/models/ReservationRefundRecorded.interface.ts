import type { CurrencyCode } from "@/app/constants";

export interface ReservationRefundRecorded {
  amount: number;
  currency: CurrencyCode;
  id: string;
  reason: string;
  recordedByName: string;
  remaining: number;
}
