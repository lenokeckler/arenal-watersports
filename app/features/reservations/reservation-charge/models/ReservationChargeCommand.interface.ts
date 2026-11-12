import type { CurrencyCode } from "@/app/constants";

export interface ReservationChargeCommand {
  amount: number;
  currency: CurrencyCode;
  paymentMethod: string;
  reservationId: string;
}
