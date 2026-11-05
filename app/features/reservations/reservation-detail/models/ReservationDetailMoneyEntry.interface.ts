import type { Database } from "@/app/types";

export interface ReservationDetailMoneyEntry {
  amount: number;
  currency: Database["public"]["Enums"]["currency_code"];
}
