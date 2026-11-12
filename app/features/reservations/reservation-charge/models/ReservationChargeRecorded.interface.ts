import type { CurrencyCode } from "@/app/constants";

export interface ReservationChargeRecorded {
  amount: number;
  chargeId: string;
  currency: CurrencyCode;
  paymentMethod: string;
  recordedByName: string;
}
