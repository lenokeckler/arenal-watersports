import type { CurrencyCode } from "@/app/constants";

export interface ReservationChargeRecordedPart {
  amount: number;
  chargeId: string;
  currency: CurrencyCode;
}
