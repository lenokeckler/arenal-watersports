import type { CurrencyCode } from "@/app/constants";

export interface ReservationChargeRecordRow {
  charge_id: string;
  charged_amount: number;
  charged_currency: CurrencyCode;
  charged_payment_method: string;
  recorded_by_name: string;
}
